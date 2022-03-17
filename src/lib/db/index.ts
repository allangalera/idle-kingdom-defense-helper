import heroListJson from '$lib/data/heroList.json';
import tiersJson from '$lib/data/ranks.json';
import classesListJson from '$lib/data/classes.json';
import typesListJson from '$lib/data/types.json';
import heroRankJson from '$lib/data/heroRankLateGame.json';
import heroRankEarlyJson from '$lib/data/heroRankEarlyGame.json';
import newHeroRankListJson from '$lib/data/newList.json';
import gStageJson from '$lib/data/g_stage.json';
import gStagePoolJson from '$lib/data/g_stagePool.json';
import { addIdToCollection, createSortByListAndName } from '$lib/utils';
import { CASTLE_INITIAL_UPGRADE_COST, CASTLE_MAX_LEVEL } from '$lib/constants';

const classesListJsonRaw = addIdToCollection(classesListJson);
const typesListJsonRaw = addIdToCollection(typesListJson);
const tiersJsonRaw = addIdToCollection(tiersJson);
const heroesJsonRaw = addIdToCollection(heroListJson);

export const tiers = tiersJsonRaw;
export const classes = classesListJsonRaw;
export const types = typesListJsonRaw;

const heroesRaw = heroesJsonRaw.map((hero) => {
	return {
		...hero,
		tier: tiersJsonRaw.find((tier) => hero.tier === tier.name),
		class: classesListJsonRaw.find((heroClass) => hero.class === heroClass.name),
		type: typesListJsonRaw.find((type) => hero.type === type.name),
	};
});

const sortByTierListAndName = createSortByListAndName(tiers.map((tier) => tier.name));

export const heroes = sortByTierListAndName(heroesRaw);

const heroRankLateGameRaw = heroRankJson.map((row) => {
	return {
		...row,
		heroList: row.heroList.map((heroName) => {
			return heroes.find((hero) => hero.name === heroName);
		}),
	};
});

export const heroRankLateGame = heroRankLateGameRaw.map((rank) => {
	return {
		...rank,
		heroList: sortByTierListAndName(rank.heroList),
	};
});

const heroRankEarlyGameRaw = heroRankEarlyJson.map((row) => {
	return {
		...row,
		heroList: row.heroList.map((heroName) => {
			return heroes.find((hero) => hero.name === heroName);
		}),
	};
});

export const heroRankEarlyGame = heroRankEarlyGameRaw.map((rank) => {
	return {
		...rank,
		heroList: sortByTierListAndName(rank.heroList),
	};
});

export const newHeroRankList = newHeroRankListJson.map((row) => {
	return {
		...row,
		heroList: row.heroList.map((heroName) => {
			return heroes.find((hero) => hero.name === heroName);
		}),
	};
});

const generateCastleGoldUpgradeData = (): Map<number, { cost: number; cumulativeCost: number }> => {
	let levelUpgradeCost = CASTLE_INITIAL_UPGRADE_COST;
	let result = 0;
	const castleUpgradeData = new Map();
	for (let level = 1; level <= CASTLE_MAX_LEVEL; level++) {
		levelUpgradeCost += getLevelIncrement(level);
		result += levelUpgradeCost;
		castleUpgradeData.set(level, {
			cost: levelUpgradeCost,
			cumulativeCost: result,
		});
	}
	return castleUpgradeData;
};

const getLevelIncrement = (level: number) => {
	const roundedValue = Math.floor(level / 500 - 0.0021);
	return roundedValue <= 20 ? (roundedValue + 1) * 10 : 210;
};

export const castleGoldUpgradeData = generateCastleGoldUpgradeData();

// const gStageJsonLength = gStageJson.length;

// for (let i = 1; i < gStageJsonLength; i++) {
// 	const currentGStage = gStageJson[i];
// 	const diff = currentGStage.lv - gStageJson[i - 1].lv;
// 	console.groupCollapsed(`Stage: ${i} | diff: ${diff}`);
// 	console.log(currentGStage);
// 	console.groupEnd();
// }

// const gStagePoolJsonLength = gStagePoolJson.length;
// let latestPoolId = 0;
// let counter = 0;
// for (let i = 0; i < gStagePoolJsonLength; i++) {
// 	if (latestPoolId !== gStagePoolJson[i].poolId) {
// 		latestPoolId = gStagePoolJson[i].poolId;
// 		console.log(counter);
// 		counter = 0;
// 	}
// 	counter++;
// 	// const currentGStagePool = gStagePoolJson[i];
// 	// if (i > 0) {
// 	// const diff = currentGStagePool.poolId - gStagePoolJson[i - 1].poolId;
// 	// console.groupCollapsed(`Stage: ${i} | diff: ${diff}`);
// 	// console.log(currentGStagePool);
// 	// if (diff !== 7) console.log('changed');
// 	// console.groupEnd();
// 	// }
// }

// for i = 1, table.maxn(g_stagePool) do
//   if _gStagePool[g_stagePool[i].poolId] == nil then
//     _gStagePool[g_stagePool[i].poolId] = {}
//   end

//   if _gStagePool[g_stagePool[i].poolId][g_stagePool[i].setId] == nil then
//     _gStagePool[g_stagePool[i].poolId][g_stagePool[i].setId] = {}
//   end

//   table.insert(_gStagePool[g_stagePool[i].poolId][g_stagePool[i].setId], table.maxn(_gStagePool[g_stagePool[i].poolId][g_stagePool[i].setId]) + 1, g_stagePool[i])
// end

export const generateGStagePool = () => {
	const _gStagePool = {};
	const gStagePoolJsonLength = gStagePoolJson.length;
	for (let i = 0; i < gStagePoolJsonLength; i++) {
		const currentStagePool = gStagePoolJson[i];
		if (!_gStagePool[currentStagePool.poolId]) {
			_gStagePool[currentStagePool.poolId] = {};
		}

		if (!_gStagePool[currentStagePool.poolId][currentStagePool.setId]) {
			_gStagePool[currentStagePool.poolId][currentStagePool.setId] = [];
		}

		_gStagePool[currentStagePool.poolId][currentStagePool.setId].push(currentStagePool);
	}

	return _gStagePool;
};

const _gStagePool = generateGStagePool();

export const getEnemyIdFromStage = (stage: number) => {
	if (stage === 0) return;
	const gStageJsonLength = gStageJson.length;

	let stageData;
	for (let i = 1; i < gStageJsonLength; i++) {
		const currentStageData = gStageJson[i];
		if (currentStageData.lv <= stage) {
			stageData = currentStageData;
		} else {
			break;
		}
	}
	if (!stageData) return;
	const dLv = stage - stageData.lv;
	const stagePool = _gStagePool[stageData.poolId];
	const setCnt = Object.keys(stagePool).length;
	const setIdx = (dLv % setCnt) + 1;
	const selectedStageSet = stagePool[setIdx];

	return selectedStageSet;
};

for (let i = 1000; i < 1050; i++) {
	getEnemyIdFromStage(i);
}
