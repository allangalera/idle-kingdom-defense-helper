import { HeroGearEquipOptions } from '$lib/enums';
import buffSkillJSON from '$lib/gameInfo/buffSkill.json';
import gearJSON from '$lib/gameInfo/gear.json';
import heroConstJSON from '$lib/gameInfo/heroConst.json';
import heroGradeInfoJSON from '$lib/gameInfo/heroGradeInfo.json';
import heroGradesJSON from '$lib/gameInfo/heroGrades.json';
import heroLvCostJSON from '$lib/gameInfo/heroLvCost.json';
import heroesJSON from '$lib/gameInfo/heroes.json';
import langJSON from '$lib/gameInfo/lang.json';
import mainSkillJSON from '$lib/gameInfo/mainSkill.json';
import summonSkillJSON from '$lib/gameInfo/summonSkill.json';
import type { Skill } from '$lib/types';
import * as R from 'remeda';

export type RawHeroType = typeof heroesJSON[number];

export type AscensionType = typeof heroGradesJSON[number];

export type UserRuneType = {
  id: number;
  enchant: number;
  value: number;
};

export type UserHero = {
  id: number;
  level?: number;
  grade?: number;
  equip?: {
    [HeroGearEquipOptions.weapon]?: number | null;
    [HeroGearEquipOptions.helmet]?: number | null;
    [HeroGearEquipOptions.chest]?: number | null;
    [HeroGearEquipOptions.boots]?: number | null;
  };
  runes?: Record<number, UserRuneType>;
};

export type HeroType = Omit<RawHeroType, 'skillKey' | 'assetId' | 'img'> & {
  ascension: AscensionType[];
  skills: Skill[];
} & Partial<UserHero>;

function getHeroAscension(heroId: number) {
  return heroGradesJSON.filter((heroGrade) => heroGrade.heroId === heroId);
}

function getSummonSkill(hero) {
  const summonSkill = summonSkillJSON.find(
    (summonSkillItem) => summonSkillItem.id === hero.mainSkill
  );

  return {
    ...R.omit(summonSkill, ['summonAssetId', 'desc', 'name', 'soundFire', 'icon']),
    name: langJSON[summonSkill.name],
    desc: langJSON[summonSkill.desc],
    coolTime: hero.skillCoolTime,
    skillType: hero.skillType,
    progression: [
      {
        units: summonSkill.summonN,
        time: summonSkill.summonTime,
      },
    ],
  };
}

function getBuffSkill(hero) {
  const buffSkill = buffSkillJSON.find((buffSkillItem) => buffSkillItem.id === hero.mainSkill);

  return {
    ...R.omit(buffSkill, ['effectAssetId', 'desc', 'name', 'assetId', 'soundFire', 'icon']),
    name: langJSON[buffSkill.name],
    desc: langJSON[buffSkill.desc],
    coolTime: hero.skillCoolTime,
    skillType: hero.skillType,
    progression: [
      {
        value: buffSkill.effectK,
      },
    ],
  };
}

function getMainSkill(hero) {
  const mainSkill = mainSkillJSON.find((mainSkillItem) => mainSkillItem.id === hero.mainSkill);
  return {
    ...R.omit(mainSkill, [
      'assetId',
      'bottomAssetId',
      'desc',
      'icon',
      'rangeAssetId',
      'soundHit',
      'soundFire',
      'summonAssetId',
    ]),
    name: langJSON[`${hero.skillKey}NAME_1`],
    desc: langJSON[`${hero.skillKey}DESC_1`],
    coolTime: hero.skillCoolTime,
    skillType: hero.skillType,
    progression: [
      {
        value: mainSkill.atkK,
      },
    ],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSkill(hero: any) {
  const skillTypes = {
    1: getMainSkill,
    2: getBuffSkill,
    3: getSummonSkill,
  };
  return skillTypes[hero.skillType](hero);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getHeroSkills(hero: any, ascension: any) {
  const skills = [getSkill(hero)];
  skills.push({
    name: langJSON[`${hero.skillKey}NAME_2`],
    desc: langJSON[`${hero.skillKey}DESC_2`],
    progression: [],
  });
  skills.push({
    name: langJSON[`${hero.skillKey}NAME_3`],
    desc: langJSON[`${hero.skillKey}DESC_3`],
    progression: [],
  });
  skills.push({
    name: langJSON[`${hero.skillKey}NAME_4`],
    desc: langJSON[`${hero.skillKey}DESC_4`],
    progression: [],
  });
  skills.push({
    name: langJSON[`${hero.skillKey}NAME_5`],
    desc: langJSON[`${hero.skillKey}DESC_5`],
    progression: [],
  });

  for (let index = 1; index < ascension.length; index++) {
    const currentSkill = (ascension[index].grade - 1) % 5;
    skills[currentSkill].progression.push({
      value: ascension[index].value,
      durTime: ascension[index].durTime,
      percentage: ascension[index].percentage,
      effectType: ascension[index].effectType,
      addType: ascension[index].addType,
    });
  }
  return skills;
}

const generateHeroList = (): HeroType[] => {
  const heroes = heroesJSON.map((hero) => {
    const ascension = getHeroAscension(hero.id);
    const skills = getHeroSkills(hero, ascension);
    return {
      ...R.omit(hero, ['skillKey', 'assetId', 'img', 'name']),
      name: langJSON[hero.name],
      ascension,
      skills,
    };
  });
  return heroes;
};

export const defaultSortingHeroes = (heroes: HeroType[]) =>
  R.sortBy(
    heroes,
    [(x) => !!x.level, 'desc'],
    [(x) => x.grade, 'desc'],
    [(x) => x.baseGrade, 'desc'],
    [(x) => x.level, 'desc'],
    (x) => x.id
  );

export const heroes = defaultSortingHeroes(generateHeroList());

export const heroGradeInfo = heroGradeInfoJSON;

export const heroLvCost = heroLvCostJSON;

export const MAX_HERO_LEVEL = heroGradeInfoJSON.slice(-1)[0].maxLv;

export const MAX_HERO_GRADE = heroConstJSON.HERO.MAX_GRADE;

export const gears = gearJSON;
