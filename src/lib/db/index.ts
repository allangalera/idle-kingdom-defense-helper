// import { A } from '@mobily/ts-belt';
import heroListJson from '$lib/data/heroList.json';
import tiersJson from '$lib/data/ranks.json';
import classesListJson from '$lib/data/classes.json';
import typesListJson from '$lib/data/types.json';
import heroRankJson from '$lib/data/heroRankLateGame.json';
import heroRankEarlyJson from '$lib/data/heroRankEarlyGame.json';
import newHeroRankListJson from '$lib/data/newList.json';
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
