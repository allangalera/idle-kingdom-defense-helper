import heroListJson from '$lib/data/heroList.json';
import tiersJson from '$lib/data/ranks.json';
import classesListJson from '$lib/data/classes.json';
import typesListJson from '$lib/data/types.json';
import heroRankJson from '$lib/data/heroRankLateGame.json';
import heroRankEarlyJson from '$lib/data/heroRankEarlyGame.json';

import * as Belt from '@mobily/ts-belt';

import { nanoid } from 'nanoid';

const addIdToCollection = <T>(collection: T[]): (T & { id: string })[] => {
	return collection.map((item) => {
		return {
			...item,
			id: nanoid()
		};
	});
};

const makeCollectionAMap = <T>(collection: T[]): Map<string, T> => {
	return collection.reduce((prev, curr) => {
		prev.set(curr.id, curr);
		return prev;
	}, new Map());
};

const sortByTierList = (item) => {
	const tierList = tiers.map((tier) => tier.name);
	// return Belt.F.anyPass(Boolean(tierList.indexOf(item.tier.name)), item.name);
	return tierList.indexOf(item.tier.name);
};

const sortByName = (item) => {
	return item.name;
};

const classesListJsonRaw = addIdToCollection(classesListJson);
const typesListJsonRaw = addIdToCollection(typesListJson);
const tiersJsonRaw = addIdToCollection(tiersJson);
const heroesJsonRaw = addIdToCollection(heroListJson);

export const classesListJsonMap = makeCollectionAMap(classesListJsonRaw);
export const typesListJsonMap = makeCollectionAMap(typesListJsonRaw);
export const tiersJsonMap = makeCollectionAMap(tiersJsonRaw);
export const heroesJsonMap = makeCollectionAMap(heroesJsonRaw);

export const tiers = tiersJsonRaw;
export const classes = classesListJsonRaw;
export const types = typesListJsonRaw;

const heroesRaw = heroesJsonRaw.map((hero) => {
	return {
		...hero,
		tier: tiersJsonRaw.find((tier) => hero.tier === tier.name),
		class: classesListJsonRaw.find((heroClass) => hero.class === heroClass.name),
		type: typesListJsonRaw.find((type) => hero.type === type.name)
	};
});

export const heroes = Belt.A.sortBy(Belt.A.sortBy(heroesRaw, sortByName), sortByTierList);

const heroRankLateGameRaw = heroRankJson.map((row) => {
	return {
		...row,
		heroList: row.heroList.map((heroName) => {
			return heroes.find((hero) => hero.name === heroName);
		})
	};
});

export const heroRankLateGame = heroRankLateGameRaw.map((rank) => {
	return {
		...rank,
		heroList: Belt.A.sortBy(Belt.A.sortBy(rank.heroList, sortByName), sortByTierList)
	};
});

const heroRankEarlyGameRaw = heroRankEarlyJson.map((row) => {
	return {
		...row,
		heroList: row.heroList.map((heroName) => {
			return heroes.find((hero) => hero.name === heroName);
		})
	};
});

export const heroRankEarlyGame = heroRankEarlyGameRaw.map((rank) => {
	return {
		...rank,
		heroList: Belt.A.sortBy(Belt.A.sortBy(rank.heroList, sortByName), sortByTierList)
	};
});
