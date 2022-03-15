import { ArcherGearEquip, HeroGearEquip } from '$lib/enums';
import { equals } from 'ramda';
import gearUnlockLevelsJson from '$lib/data/gearUnlockLevels.json';
import { getEnemyIdFromStage } from '$lib/db';

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
		return equals(currentBestGear, stageGear);
	} else if (hasHeroGear && !hasArcherGear) {
		return equals(currentBestGear.hero, stageGear.hero);
	} else if (!hasHeroGear && hasArcherGear) {
		return equals(currentBestGear.archer, stageGear.archer);
	}

	return equals(currentBestGear, stageGear);
};

export const returnItemLevelDropFromStage = (stage) => {
	const archer = {};
	const hero = {};
	for (const level of Object.keys(gearUnlockLevelsJson)) {
		if (level > stage) break;
		const archerDrop = gearUnlockLevelsJson[level].filter((item) => item.includes('archer'));
		if (archerDrop.length) {
			archer['full'] = archerDrop[0];
			archer['rarity'] = archerDrop[0].split('-')[1];
			archer['level'] = +archerDrop[0].split('-')[2];
		}
		const heroDrop = gearUnlockLevelsJson[level].filter((item) => item.includes('hero'));
		if (heroDrop.length) {
			hero['full'] = heroDrop[0];
			hero['rarity'] = heroDrop[0].split('-')[1];
			hero['level'] = +heroDrop[0].split('-')[2];
		}
	}

	return { archer, hero };
};

export const calculateStage = (stage: string, wantedGear) => {
	const parsedStage = +stage || 1;

	let currentBestGear = returnItemLevelDropFromStage(parsedStage);

	const stages = [];
	let stageGear;

	let currentStage = parsedStage - 1;
	while (currentStage > 0) {
		stageGear = returnItemLevelDropFromStage(currentStage);
		const validate = validateIfGearIsValid(currentBestGear, stageGear, wantedGear);

		if (!validate && stages.length === 0) {
			currentBestGear = stageGear;
		} else if (!validate) {
			break;
		}

		const heroDropFromStage = calculateHeroDropFromStage(currentStage);
		const archerDropFromStage = calculateArcherDropFromStage(currentStage);
		const enemyType = getEnemyIdFromStage(currentStage);

		const currentStageData = {
			stage: currentStage,
			enemy: enemyType,
			drop: {
				hero: heroDropFromStage,
				archer: archerDropFromStage,
			},
			bestGear: stageGear,
		};

		const condition = `${Math.min(wantedGear.hero.length, 2)}-${Math.min(
			wantedGear.archer.length,
			2
		)}`;

		let step = 1;

		switch (condition) {
			case '0-0':
				if (heroDropFromStage === 'all' && archerDropFromStage === 'all') {
					stages.push(currentStageData);
					step = 35;
				}
				break;
			case '0-1':
				if (wantedGear.archer.includes(archerDropFromStage)) {
					stages.push(currentStageData);
					step = 7;
				}
				break;
			case '0-2':
				if (archerDropFromStage === 'all') {
					stages.push(currentStageData);
					step = 7;
				}
				break;
			case '1-0':
				if (wantedGear.hero.includes(heroDropFromStage)) {
					stages.push(currentStageData);
					step = 5;
				}
				break;
			case '1-1':
				if (
					wantedGear.hero.includes(heroDropFromStage) &&
					wantedGear.archer.includes(archerDropFromStage)
				) {
					stages.push(currentStageData);
					currentStage += -35;
					step = 35;
				}
				break;
			case '1-2':
				if (wantedGear.hero.includes(heroDropFromStage) && archerDropFromStage === 'all') {
					stages.push(currentStageData);
					step = 35;
				}
				break;
			case '2-0':
				if (heroDropFromStage === 'all') {
					stages.push(currentStageData);
					step = 5;
				}
				break;
			case '2-1':
				if (heroDropFromStage === 'all' && wantedGear.archer.includes(archerDropFromStage)) {
					stages.push(currentStageData);
					step = 35;
				}
				break;
			case '2-2':
				if (heroDropFromStage === 'all' && archerDropFromStage === 'all') {
					stages.push(currentStageData);
					step = 35;
				}
				break;
		}
		currentStage -= step;
	}

	return {
		stages,
		currentBestGear,
	};
};
