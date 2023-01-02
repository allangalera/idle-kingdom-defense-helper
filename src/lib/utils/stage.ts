import type { CardTypes } from '$lib/components/Card/type';
import { MAX_STAGE_LEVEL } from '$lib/constants';
import { getEnemyIdFromStage } from '$lib/db';
import {
	designStageUnlock,
	heroGearStageUnlock,
	stageClearReward,
	stageIdleReward,
} from '$lib/db/stage';
import { ArcherGearEquip, HeroGearEquip } from '$lib/types/enums';
import { match } from 'oxide.ts';
import * as R from 'remeda';

export const calculateHeroDropFromStage = (stage) => {
	const stageDrops = [
		'all',
		HeroGearEquip.weapon,
		HeroGearEquip.helmet,
		HeroGearEquip.chest,
		HeroGearEquip.boots,
	];

	return stageDrops[stage % 5];
};

export const calculateArcherDropFromStage = (stage) => {
	const drops = [
		'all',
		ArcherGearEquip.bow,
		ArcherGearEquip.arrow,
		ArcherGearEquip.helmet,
		ArcherGearEquip.chest,
		ArcherGearEquip.gloves,
		ArcherGearEquip.boots,
	];

	return drops[stage % 7];
};

export const validateIfGearIsValid = (currentBestGear, stageGear, wanted) => {
	const hasHeroGear = wanted.hero.length > 0;
	const hasArcherGear = wanted.archer.length > 0;

	if (!currentBestGear.hero && !currentBestGear.archer) return false;

	if (hasHeroGear && hasArcherGear) {
		return R.equals(currentBestGear, stageGear);
	} else if (hasHeroGear && !hasArcherGear) {
		return R.equals(currentBestGear.hero, stageGear.hero);
	} else if (!hasHeroGear && hasArcherGear) {
		return R.equals(currentBestGear.archer, stageGear.archer);
	}

	return R.equals(currentBestGear, stageGear);
};

export const returnItemLevelDropFromStage = (stage) => {
	let archer = 0;
	let hero = 0;
	for (const grade of Object.keys(designStageUnlock)) {
		if (designStageUnlock[grade] > stage) break;
		archer = +grade;
	}
	for (const grade of Object.keys(heroGearStageUnlock)) {
		if (heroGearStageUnlock[grade] > stage) break;
		hero = +grade;
	}

	return { archer, hero };
};

export const calculateStage = (stage: string, wantedGear, enemies, dir = 'backwards') => {
	const parsedStage = +stage || 1;
	const items_per_page = 20;

	const stages = [];
	let stageGear;
	let latestStageSearched = parsedStage;

	const { start, limit, step } = match(dir, [
		['backward', { start: parsedStage - 1, limit: 0, step: -1 }],
		['forward', { start: parsedStage + 1, limit: MAX_STAGE_LEVEL, step: 1 }],
	]);

	for (let currentStage = start; currentStage !== limit; currentStage += step) {
		stageGear = returnItemLevelDropFromStage(currentStage);

		const heroDropFromStage = stageGear.hero && calculateHeroDropFromStage(currentStage);
		const archerDropFromStage = stageGear.archer && calculateArcherDropFromStage(currentStage);
		const { stageData, selectedStageSet: enemyType } = getEnemyIdFromStage(currentStage);
		const hasEnemy =
			enemies.length === 0
				? true
				: enemies.every((enemy) =>
						enemyType.some((enemyTypeItem) => enemy === enemyTypeItem.unitId),
				  );

		if (!hasEnemy) continue;

		const currentStageData = {
			stage: currentStage,
			data: stageData,
			enemy: enemyType,
			drop: {
				hero: heroDropFromStage,
				archer: archerDropFromStage,
			},
			bestGear: stageGear,
		};

		const condition = `${Math.min(wantedGear.hero.length, 2)}-${Math.min(
			wantedGear.archer.length,
			2,
		)}`;

		switch (condition) {
			case '0-0':
				if ((heroDropFromStage === 'all' && archerDropFromStage === 'all') || hasEnemy) {
					stages.push(currentStageData);
				}
				break;
			case '0-1':
				if (wantedGear.archer.includes(archerDropFromStage)) {
					stages.push(currentStageData);
				}
				break;
			case '0-2':
				if (archerDropFromStage === 'all') {
					stages.push(currentStageData);
				}
				break;
			case '1-0':
				if (wantedGear.hero.includes(heroDropFromStage)) {
					stages.push(currentStageData);
				}
				break;
			case '1-1':
				if (
					wantedGear.hero.includes(heroDropFromStage) &&
					wantedGear.archer.includes(archerDropFromStage)
				) {
					stages.push(currentStageData);
				}
				break;
			case '1-2':
				if (wantedGear.hero.includes(heroDropFromStage) && archerDropFromStage === 'all') {
					stages.push(currentStageData);
				}
				break;
			case '2-0':
				if (heroDropFromStage === 'all') {
					stages.push(currentStageData);
				}
				break;
			case '2-1':
				if (heroDropFromStage === 'all' && wantedGear.archer.includes(archerDropFromStage)) {
					stages.push(currentStageData);
				}
				break;
			case '2-2':
				if (heroDropFromStage === 'all' && archerDropFromStage === 'all') {
					stages.push(currentStageData);
				}
				break;
		}
		latestStageSearched = currentStage;
		if (stages.length === items_per_page) break;
	}

	return {
		stages,
		latestStageSearched,
	};
};

export const returnRewardDataByStage = (stage: number) => {
	let idleReward;
	for (const reward of stageIdleReward) {
		if (reward.lv <= stage) {
			idleReward = reward;
		} else {
			break;
		}
	}
	let clearReward;
	for (const reward of stageClearReward) {
		if (reward.lv <= stage) {
			clearReward = reward;
		} else {
			break;
		}
	}

	return {
		idle: idleReward,
		clear: clearReward,
	};
};

export const convertItemTypeToName = (type: number): CardTypes | null => {
	return match(type, [
		[24, 'ascension-stone' as const],
		[31, 'hero-seal' as const],
		[32, 'gear-seal' as const],
		[29, 'rune-seal' as const],
		() => null,
	]);
};

export const calculateStageRewardByType = (itemRate, stage, rewards) => {
	return match(itemRate.type, [
		[27, (rewards.soulInit + rewards.soulInc * (stage - rewards.lv)) * 60],
		[102, (rewards.goldInit + rewards.goldInc * (stage - rewards.lv)) * 60],
		[24, rewards.evolve.init + rewards.evolve.inc * (stage - rewards.lv)],
		[31, rewards.hscroll.init + rewards.hscroll.inc * (stage - rewards.lv)],
		[32, rewards.rscroll.init + rewards.rscroll.inc * (stage - rewards.lv)],
		[29, rewards.runescroll.init + rewards.runescroll.inc * (stage - rewards.lv)],
		() => 0,
	]);
};
