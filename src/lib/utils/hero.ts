import { MAX_HERO_LEVEL, gears, heroGradeInfo, heroLvCost } from '$lib/db/heroes';
import type { HeroType } from '$lib/db/heroes';
import { Attributes, HeroGearEquipOptions } from '$lib/enums';
import type { HeroGearEquipTypes } from '$lib/enums';
import { getRuneById } from '$lib/utils/runes';
import { match } from 'oxide.ts';
import * as R from 'remeda';
import { z } from 'zod';

const getCurrentLevelUpCostData = (level: number) => {
  let currentLvCost = heroLvCost[0];
  for (const lvCost of heroLvCost) {
    if (lvCost.level <= level) {
      currentLvCost = lvCost;
    } else {
      break;
    }
  }
  return currentLvCost;
};

const heroUpgradeCostCalculatorParameterSchema = z
  .object({
    startLevel: z.number().gte(0),
  })
  .extend({
    endLevel: z.number().lte(MAX_HERO_LEVEL),
  })
  .refine((value) => value.startLevel < value.endLevel, {
    message: 'Start level need to be higher than End level',
  });

export const calculateLevelUpCost = (startLevel: number, endLevel: number) => {
  const validation = heroUpgradeCostCalculatorParameterSchema.safeParse({
    startLevel,
    endLevel,
  });
  const cost = {
    coins: 0,
    souls: 0,
  };

  if (!validation.success) return cost;

  for (let currentLevel = startLevel; currentLevel < endLevel; currentLevel++) {
    const currentHeroLvCost = getCurrentLevelUpCostData(currentLevel);
    cost.coins +=
      currentHeroLvCost.initCostGold +
      currentHeroLvCost.incCostGold * (currentLevel - currentHeroLvCost.level);
    cost.souls +=
      currentHeroLvCost.initCostSoul +
      currentHeroLvCost.incCostSoul * (currentLevel - currentHeroLvCost.level);
  }
  return cost;
};

export const calculateAscendCost = (startGrade: number, endGrade: number) => {
  const cost = {
    shards: 0,
    ascensionStones: 0,
  };

  if (startGrade === endGrade) {
    return cost;
  }

  for (const gradeInfo of heroGradeInfo) {
    if (gradeInfo.id > startGrade && gradeInfo.id <= endGrade) {
      cost.shards += gradeInfo.evolvePiece;
      cost.ascensionStones += gradeInfo.stone;
    }
  }

  return cost;
};

const returnGearTypeAttributeKeys = (gearType: HeroGearEquipTypes) => {
  return match(gearType, [
    [HeroGearEquipOptions.weapon, [Attributes.atk, Attributes.hit, Attributes.criDamageResist]],
    [HeroGearEquipOptions.helmet, [Attributes.hp, Attributes.criResist, Attributes.defPierce]],
    [HeroGearEquipOptions.chest, [Attributes.cri, Attributes.criDamage, Attributes.def]],
    [HeroGearEquipOptions.boots, [Attributes.dodge, Attributes.moveSpeed, Attributes.atkSpeed]],
  ]);
};

const returnGearAttributesByGrade = (grade) => {
  return gears.find((gear) => gear.grade === grade);
};

type HeroGears = Record<HeroGearEquipTypes, number | null>;

const returnGearAttributes = (
  heroGears: HeroGears
): Partial<Record<keyof typeof Attributes, number>> => {
  let stats = {};
  if (!heroGears) return stats;

  R.mapKeys(heroGears, (key, value) => {
    if (value) {
      const gearAttr = returnGearAttributesByGrade(value);
      const gearAttrKeys = returnGearTypeAttributeKeys(key);
      stats = R.merge(stats, R.pick(gearAttr, gearAttrKeys));
    }
    return 0;
  });

  return stats;
};

const returnSetStats = (heroGears: HeroGears) => {
  if (!heroGears) return false;

  const isSet = new Set(Object.values(heroGears)).size === 1;

  if (!isSet) return false;

  const gearAttr = returnGearAttributesByGrade(heroGears.weapon);
  return R.pick(gearAttr, ['setEffectValue1', 'setEffectValue2', 'setEffectValue3']);
};

export const calculateHeroStats = (hero: HeroType, heroUserData) => {
  const heroStats = R.pick(hero, [
    'atk',
    'atkSpeed',
    'cri',
    'criDamage',
    'criDamageResist',
    'criResist',
    'def',
    'defPierce',
    'defPierceResist',
    'dodge',
    'hit',
    'hp',
    'incAtk',
    'incDef',
    'incHp',
    'moveSpeed',
  ]);

  const currentLevel = heroUserData?.level ?? 1;

  const currentGrade = heroUserData?.grade ?? hero.baseGrade;

  const currentAscension = hero.ascension.find((asc) => asc.grade === currentGrade);

  heroStats.hp = (heroStats.hp + heroStats.incHp * (currentLevel - 1)) * currentAscension.incHp;
  heroStats.def = (heroStats.def + heroStats.incDef * (currentLevel - 1)) * currentAscension.incDef;
  heroStats.atk = (heroStats.atk + heroStats.incAtk * (currentLevel - 1)) * currentAscension.incAtk;

  const equipStats = returnGearAttributes(heroUserData?.equip);

  R.mapKeys(equipStats, (key, value) => {
    if ([Attributes.atkSpeed, Attributes.moveSpeed].some((attr) => attr === key)) {
      return (heroStats[key] *= 1 + value);
    }
    return (heroStats[key] += value);
  });

  // apply runes if available
  const firstCritDmgRune = getRuneById(1);
  const firstAtkRune = getRuneById(2);
  heroStats.criDamage += firstCritDmgRune.abilityInitMin;
  heroStats.atk += firstAtkRune.abilityInitMin;

  // apply set stats if available
  const equipSetStats = returnSetStats(heroUserData?.equip);
  if (equipSetStats) {
    heroStats.criDamage *= 1 + equipSetStats.setEffectValue1;
    heroStats.defPierce *= 1 + equipSetStats.setEffectValue2;
    heroStats.atk *= 1 + equipSetStats.setEffectValue3;
  }
  return heroStats;
};

export const returnAttributeName = (attr: keyof typeof Attributes) => {
  return match(attr, [
    [Attributes.hp, 'HP'],
    [Attributes.atk, 'ATK'],
    [Attributes.def, 'DEF'],
    [Attributes.cri, 'CRIT Chance'],
    [Attributes.criDamage, 'CRIT DMG'],
    [Attributes.criResist, 'CRIT Resist'],
    [Attributes.criDamageResist, 'CRIT DMG Reduce'],
    [Attributes.dodge, 'DODGE'],
    [Attributes.hit, 'ACCURACY'],
    [Attributes.defPierce, 'DEF Penetration'],
    [Attributes.defPierceResist, 'Ignore DEF Penetration'],
    [Attributes.atkSpeed, 'Attack Speed'],
    [Attributes.moveSpeed, 'Movement Speed'],
    () => attr,
  ]);
};
