import { MAX_HERO_LEVEL, gears, heroGradeInfo, heroLvCost } from '$lib/db/heroes';
import type { HeroType } from '$lib/db/heroes';
import { getTranslation } from '$lib/db/lang';
import { runes, runesMap } from '$lib/db/runes';
import { Attributes, HeroGearEquipOptions } from '$lib/types/enums';
import type { HeroGearEquipTypes } from '$lib/types/enums';
import { returnRuneAttribute } from '$lib/utils/runes';
import { returnAbilityAttributeName } from './abilities';
import { calculateArtifactStats } from './artifacts';
import { A } from '@mobily/ts-belt';
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

	if (startGrade >= endGrade) {
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
	heroGears: HeroGears,
): Partial<Record<keyof typeof Attributes, number>> => {
	const stats = {};
	if (!heroGears) return stats;

	R.mapKeys(heroGears, (key, value) => {
		if (value) {
			const gearAttr = returnGearAttributesByGrade(value);
			const gearAttrKeys = returnGearTypeAttributeKeys(key);
			for (const gearAttrKey of gearAttrKeys) {
				stats[gearAttrKey] = (stats[gearAttrKey] ?? 0) + gearAttr[gearAttrKey];
			}
		}
		return 0;
	});

	return stats;
};

const returnSetStats = (heroGears: HeroGears) => {
	if (!heroGears) return {};

	const isSet = new Set(Object.values(heroGears)).size === 1;

	if (!isSet) return {};

	const gearAttr = returnGearAttributesByGrade(heroGears.weapon);

	if (!gearAttr) return {};

	return {
		[returnRuneAttribute(gearAttr.setEffectType1)]: gearAttr.setEffectValue1,
		[returnRuneAttribute(gearAttr.setEffectType2)]: gearAttr.setEffectValue2,
		[returnRuneAttribute(gearAttr.setEffectType3)]: gearAttr.setEffectValue3,
	};
};

type EffectToStats = Record<keyof typeof Attributes, number> | Record<string, never>;

const returnSkillStats = (hero, heroUserData) => {
	let stats = {};
	for (const [skillIndex, skill] of hero.skills.entries()) {
		const { rarity, level } = convertGradeToRarityAndLevel(heroUserData?.grade ?? hero.baseGrade);

		const { value, addType, effectType } =
			skill.progression[Math.max(skillIndex <= level ? rarity : rarity - 1, 0)];
		if (addType !== 3) continue;

		const attr = returnRuneAttribute(effectType);

		if (!attr) continue;

		stats = R.merge(stats, { [attr]: value });
	}

	return stats as EffectToStats;
};

export const returnRunesStats = (heroUserData) => {
	let stats = {};

	for (const rune of runes) {
		const userRuneData = heroUserData?.runes?.[rune.id];

		if (isRuneAvailable(rune.id, heroUserData)) {
			const attrKey = returnRuneAttribute(rune.abilityType);
			stats = R.merge(stats, {
				[attrKey]: (stats[attrKey] ?? 0) + (userRuneData?.value ?? rune.abilityInitMin),
			});
		}
	}

	return stats as EffectToStats;
};

export const isRuneAvailable = (runeId: number, heroUserData): boolean => {
	const runeData = runesMap.get(runeId);

	if (!runeData) return false;

	if (runeData.openCondition.id === 0) return true;

	const userRuneDependency = heroUserData?.runes?.[runeData.openCondition.id];

	if (!userRuneDependency) return false;

	if (userRuneDependency.enchant < runeData.openCondition.eh) return false;

	return true;
};

export const getDependantRuneData = (runeId: number, heroUserData) => {
	const result = {
		have: 0,
		need: 0,
	};
	const runeData = runesMap.get(runeId);

	if (!runeData) return result;

	if (runeData.openCondition.id === 0) return result;

	const userRuneDependency = heroUserData?.runes?.[runeData.openCondition.id];

	return {
		have: userRuneDependency?.enchant ?? 0,
		need: runeData.openCondition.eh,
	};
};

const returnArtifactStats = (heroUserData) => {
	let stats: Partial<EffectToStats> = {};

	if (!heroUserData) return stats;

	const heroArtifacts = heroUserData.artifacts;

	if (!heroArtifacts) return stats;

	for (const slot of Object.keys(heroArtifacts)) {
		const artifact = heroArtifacts[slot];

		if (!artifact) continue;

		const artifactStats = calculateArtifactStats({ ...artifact, level: artifact.enhancementLevel });

		const attrKey = returnAbilityAttributeName(artifactStats.abilityType);

		stats = R.merge(stats, {
			[attrKey]: (stats[attrKey] ?? 0) + artifactStats?.value,
		});

		for (const abilityIndex of Object.keys(artifactStats.abilities)) {
			const ability = artifactStats.abilities[abilityIndex];

			const attrKey = returnAbilityAttributeName(ability.type);

			stats = R.merge(stats, {
				[attrKey]: (stats[attrKey] ?? 0) + ability?.value,
			});
		}
	}

	return stats;
};

type HeroStatsAttributes = Pick<
	HeroType,
	| 'atk'
	| 'atkSpeed'
	| 'cri'
	| 'criDamage'
	| 'criDamageResist'
	| 'criResist'
	| 'def'
	| 'defPierce'
	| 'defPierceResist'
	| 'dodge'
	| 'hit'
	| 'hp'
	| 'moveSpeed'
	| 'incAtk'
	| 'incDef'
	| 'incHp'
>;

export type HeroStats = HeroStatsAttributes & {
	composedStats: {
		base: Partial<HeroStatsAttributes>;
		equip: Partial<HeroStatsAttributes>;
		skill: Partial<HeroStatsAttributes>;
		runes: Partial<HeroStatsAttributes>;
		equipSet: Partial<HeroStatsAttributes>;
		artifacts: Partial<HeroStatsAttributes>;
	};
};

export const calculateHeroStats = (hero: HeroType, heroUserData): HeroStats => {
	const heroInitialStats: HeroStatsAttributes = R.pick(hero, [
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
	const heroStats: HeroStats = {
		...heroInitialStats,
		composedStats: {
			base: {},
			equip: {},
			skill: {},
			runes: {},
			equipSet: {},
			artifacts: {},
		},
	};
	const currentLevel = heroUserData?.level ?? 1;

	const currentGrade = heroUserData?.grade ?? hero.baseGrade;

	const currentAscension = hero.ascension.find((asc) => asc.grade === currentGrade);

	heroStats.hp = (heroStats.hp + heroStats.incHp * (currentLevel - 1)) * currentAscension.incHp;
	heroStats.def = (heroStats.def + heroStats.incDef * (currentLevel - 1)) * currentAscension.incDef;
	heroStats.atk = (heroStats.atk + heroStats.incAtk * (currentLevel - 1)) * currentAscension.incAtk;

	heroStats.composedStats.base = { ...heroStats };

	// apply equip stats if available
	const equipStats = returnGearAttributes(heroUserData?.equip);

	R.mapKeys(equipStats, (key, value) => {
		if ([Attributes.atkSpeed, Attributes.moveSpeed].some((attr) => attr === key)) {
			return (heroStats[key] *= 1 + value);
		}
		return (heroStats[key] += value);
	});

	heroStats.composedStats.equip = equipStats;

	// apply skills attributes
	const skillStats = returnSkillStats(hero, heroUserData);

	R.mapKeys(skillStats, (key, value) => {
		if ([Attributes.atkSpeed, Attributes.moveSpeed].some((attr) => attr === key)) {
			return (heroStats[key] *= 1 + value);
		}
		return (heroStats[key] += value);
	});

	heroStats.composedStats.skill = skillStats;

	// apply runes if available
	const runesStats = returnRunesStats(heroUserData);

	R.mapKeys(runesStats, (key, value) => {
		if ([Attributes.atkSpeed, Attributes.moveSpeed].some((attr) => attr === key)) {
			return (heroStats[key] *= 1 + value);
		}
		return (heroStats[key] += value);
	});

	heroStats.composedStats.runes = runesStats;

	// apply artifact stats if available
	const artifactStats = returnArtifactStats(heroUserData);
	const finalArtifactStats: Partial<EffectToStats> = {};

	R.mapKeys(artifactStats, (key, value) => {
		if ([Attributes.warriorSkillDmg, Attributes.supporterSkillDmg].some((attr) => attr === key)) {
			return null;
		}

		if ([Attributes.atkP, Attributes.defP, Attributes.hpP].some((attr) => attr === key)) {
			finalArtifactStats[key] = (finalArtifactStats[key] ?? 0) + value;
			return;
		}

		if (key === Attributes.supporterAtk && hero.unitType === 1) {
			finalArtifactStats[Attributes.atkP] = (finalArtifactStats[Attributes.atkP] ?? 0) + value;
			return;
		}

		if (key === Attributes.warriorAtk && hero.unitType === 2) {
			finalArtifactStats[Attributes.atkP] = (finalArtifactStats[Attributes.atkP] ?? 0) + value;
			return;
		}

		finalArtifactStats[key] = (finalArtifactStats[key] ?? 0) + value;
		return (heroStats[key] += value);
	});

	R.mapKeys(finalArtifactStats, (key, value) => {
		if ([Attributes.atkP, Attributes.defP, Attributes.hpP].some((attr) => attr === key)) {
			const tmpKey = key.replace('%', '');
			const tmpValue = value / 1000;
			finalArtifactStats[tmpKey] = (finalArtifactStats[tmpKey] ?? 0) + heroStats[tmpKey] * tmpValue;
			return (heroStats[tmpKey] *= 1 + tmpValue);
		}
		return null;
	});

	heroStats.composedStats.artifacts = finalArtifactStats;

	// apply set stats if available
	// TODO: set can also be incomplete
	const equipSetStats = returnSetStats(heroUserData?.equip);
	const finalEquipSetStats = {};

	R.mapKeys(equipSetStats, (key, value) => {
		finalEquipSetStats[key] = heroStats[key] * value;
		return (heroStats[key] *= 1 + value);
	});

	heroStats.composedStats.equipSet = finalEquipSetStats;

	return heroStats;
};

export const returnAttributeName = (attr: string) => {
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

export const calculateDPS = (stats) => {
	const criRatio = stats.cri / 10000;
	const criDamageRatio = stats.criDamage / 10000;
	const normalDamage = stats.atk * stats.atkSpeed;
	const criticalDamage = stats.atk * stats.atkSpeed * (1 + criDamageRatio);
	const normalDamageRatio = Math.max(1 - criRatio, 0);
	const criticalDamageRatio = Math.min(criRatio, 1);
	return normalDamageRatio * normalDamage + criticalDamage * criticalDamageRatio;
};

export const formatSkillName = (name) => {
	return name ? name.replace('{0}', '').trim() : name;
};

export const formatSkillDescription = (skill, skillIndex, heroGrade, hero) => {
	const { rarity, level } = convertGradeToRarityAndLevel(heroGrade);

	const skillLevel = skill.progression[Math.max(skillIndex <= level ? rarity : rarity - 1, 0)];

	const {
		desc: skillDescription,
		effectType: skillEffectType,
		skillType,
		targetType,
		effectDurTime,
	} = skill;

	const { addType, effectType, value, durTime, percentage, units, time } = skillLevel;

	let coolTime = '';

	if (skill.coolTime) {
		coolTime = ` Cooldown: ${skill.coolTime}s`;
	}

	if (!addType && !effectType) {
		const finalSkillDescription = match(`${skillType}-${skillEffectType}-${targetType}`, [
			['1-0-0', skillDescription.replace('{0}', Math.round(value * 100).toString())],
			['1-0-1', skillDescription.replace('{0}', Math.round(value * 100).toString())],
			[
				'2-1-3',
				skillDescription
					.replace('{0}', effectDurTime)
					.replace('{1}', Math.round(value * 100).toString()),
			],
			[
				'2-2-2',
				skillDescription
					.replace('{0}', effectDurTime)
					.replace('{1}', Math.round(value * 100).toString()),
			],
			[
				'2-2-3',
				skillDescription
					.replace('{0}', effectDurTime)
					.replace('{1}', Math.round(value * 100).toString()),
			],
			[
				'2-3-4',
				skillDescription
					.replace('{0}', effectDurTime)
					.replace('{1}', Math.round(value * 100).toString()),
			],
			[
				'2-5-4',
				skillDescription
					.replace('{0}', effectDurTime)
					.replace('{1}', Math.round(value * 100).toString()),
			],
			[
				'2-8-4',
				skillDescription
					.replace('{0}', effectDurTime)
					.replace('{1}', Math.round(value * 100).toString()),
			],
			[
				'2-51-4',
				skillDescription
					.replace('{0}', effectDurTime)
					.replace('{1}', Math.round(value * 100).toString()),
			],
			[
				'2-51-8',
				skillDescription
					.replace('{0}', effectDurTime)
					.replace('{1}', Math.round(value * 100).toString()),
			],
			() => skillDescription.replace('{0}', units).replace('{1}', time),
		]);
		return `${finalSkillDescription}${coolTime}`;
	}

	const finalSkillDescription = match(`${addType}-${effectType}`, [
		['1-1', skillDescription.replace('{0}', Math.round(value * 100).toString())],
		[
			'1-2',
			skillDescription
				.replace('{1}', Math.round(value * 100).toString())
				.replace('{0}', skill.effectDurTime),
		],
		['1-3', skillDescription.replace('{0}', (value - hero.skills[0].effectDurTime).toString())],
		['1-4', skillDescription.replace('{0}', value).replace('{1}', durTime)],
		['2-1', skillDescription.replace('{2}', Math.round(value * 100).toString())],
		['2-3', skillDescription.replace('{2}', Math.round(value * 100).toString())],
		['2-6', skillDescription.replace('{2}', Math.round(value * 100).toString())],
		['2-8', skillDescription.replace('{2}', Math.round(value * 100).toString())],
		['2-9', skillDescription.replace('{1}', durTime)],
		[
			'2-21',
			skillDescription
				.replace('{0}', Math.round(percentage * 100).toString())
				.replace('{1}', durTime)
				.replace('{2}', Math.round(value * 100).toString()),
		],
		[
			'2-22',
			skillDescription
				.replace('{0}', Math.round(percentage * 100).toString())
				.replace('{1}', durTime)
				.replace('{2}', Math.round(value * 100).toString()),
		],
		[
			'2-23',
			skillDescription
				.replace('{0}', Math.round(percentage * 100).toString())
				.replace('{1}', durTime),
		],
		[
			'2-24',
			skillDescription
				.replace('{0}', Math.round(percentage * 100).toString())
				.replace('{1}', durTime)
				.replace('{2}', Math.round(value * 100).toString()),
		],
		[
			'2-99',
			() => {
				if (value) {
					return skillDescription.replace('{2}', Math.round(value * 100).toString());
				}
				if (percentage) {
					return skillDescription.replace('{0}', Math.round(percentage * 100).toString());
				}
				return skillDescription.replace('{1}', durTime);
			},
		],
		[
			'2-101',
			skillDescription
				.replace('{0}', Math.round(percentage * 100).toString())
				.replace('{1}', durTime),
		],
		[
			'2-102',
			skillDescription
				.replace('{0}', Math.round(percentage * 100).toString())
				.replace('{1}', durTime),
		],
		[
			'2-103',
			skillDescription
				.replace('{0}', Math.round(percentage * 100).toString())
				.replace('{1}', durTime),
		],
		['3-1', skillDescription.replace('{0}', Math.round(value * 100).toString())],
		['3-501', skillDescription.replace('{0}', Math.round(value * 100).toString())],
		['3-502', skillDescription.replace('{0}', Math.round(value * 100).toString())],
		[(x) => Boolean(x.match('3-')), skillDescription.replace('{0}', value)],
		[
			'4-102',
			skillDescription
				.replace('{0}', Math.round(percentage * 100).toString())
				.replace('{1}', durTime),
		],
		[
			'4-103',
			skillDescription
				.replace('{0}', Math.round(percentage * 100).toString())
				.replace('{1}', durTime),
		],
		() => skillDescription.replace('{0}', Math.round(value * 100).toString()),
	]);
	return `${finalSkillDescription}${coolTime}`;
};

export const formatSkillValue = (hero, skill, progressionAttributes) => {
	const { effectType: skillEffectType, skillType, targetType } = skill;
	const { value, durTime, units, time, percentage, addType, effectType } = progressionAttributes;

	// console.group(`${hero.name} - ${skill.name}`);
	// console.log(`${skillType}-${skillEffectType}-${targetType}`);
	// console.log(`${addType}-${effectType}`);
	// console.groupEnd();

	if (!addType && !effectType) {
		return match(`${skillType}-${skillEffectType}-${targetType}`, [
			['1-0-0', `${Math.round(value * 100)}%`],
			['1-0-1', `${Math.round(value * 100)}%`],
			['2-1-3', `${Math.round(value * 100)}%`],
			['2-2-2', `${Math.round(value * 100)}%`],
			['2-2-3', `${Math.round(value * 100)}%`],
			['2-3-4', `${Math.round(value * 100)}%`],
			['2-5-4', `${Math.round(value * 100)}%`],
			['2-8-4', `${Math.round(value * 100)}%`],
			['2-51-4', `${Math.round(value * 100)}%`],
			['2-51-8', `${Math.round(value * 100)}%`],
			() => `${units}|${time}s`,
		]);
	}

	return match(`${addType}-${effectType}`, [
		['1-3', `${value - hero.skills[0].effectDurTime}s`],
		['1-4', `${value}|${durTime}s`],
		['2-1', `${Math.round(value * 100)}%`],
		['2-3', `${Math.round(value * 100)}%`],
		['2-6', `${Math.round(value * 100)}%`],
		['2-8', `${Math.round(value * 100)}%`],
		['2-9', `${durTime}s`],
		[
			'2-99',
			() => {
				if (value) {
					return `${Math.round(value * 100)}%`;
				}
				if (percentage) {
					return `${Math.round(percentage * 100)}%`;
				}

				return `${durTime}s`;
			},
		],
		[(x) => Boolean(x.match('2-')), `${Math.round(percentage * 100)}%`],
		['3-1', Math.round(value * 100)],
		['3-501', `${Math.round(value * 100)}%`],
		['3-502', `${Math.round(value * 100)}%`],
		[(x) => Boolean(x.match('3-')), value],
		['4-102', `${Math.round(percentage * 100)}%`],
		['4-103', `${Math.round(percentage * 100)}%`],
		() => `${Math.round(value * 100)}%`,
	]);
};

export const isCurrentSkillLevel = (
	grade: number,
	skillIndex: number,
	skillProgressionIndex: number,
) => {
	const { rarity, level } = convertGradeToRarityAndLevel(grade);

	if (rarity === skillProgressionIndex && skillIndex <= level) return true;
	if (skillIndex > level && rarity - 1 === skillProgressionIndex) return true;

	return false;
};

export const convertGradeToRarityAndLevel = (grade: number): { rarity: number; level: number } => {
	const level = getLevelFromGrade(grade) - 1;

	const rarity = getRarityFromGrade(grade) - 1;

	return { rarity, level };
};

export const getLevelFromGrade = (grade: number) => {
	const level = grade % 5;
	if (A.includes([0, 5], level)) {
		return 5;
	}
	return level;
};

export const getRarityFromGrade = (grade: number) => {
	return match(grade / 5, [
		[(n) => n <= 1, 1],
		[(n) => n <= 2, 2],
		[(n) => n <= 3, 3],
		[(n) => n <= 4, 4],
		[(n) => n <= 5, 5],
		() => 6,
	]);
};

export const returnRarityName = (rarity: number) => {
	return getTranslation(`RARITY_NAME_${rarity}`);
};
