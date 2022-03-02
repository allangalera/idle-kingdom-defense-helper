// import { A } from '@mobily/ts-belt';
import heroListJson from '$lib/data/heroList.json';
import tiersJson from '$lib/data/ranks.json';
import classesListJson from '$lib/data/classes.json';
import typesListJson from '$lib/data/types.json';
import heroRankJson from '$lib/data/heroRankLateGame.json';
import heroRankEarlyJson from '$lib/data/heroRankEarlyGame.json';
import { addIdToCollection, createSortByListAndName, sortByName, sortByTierList } from '$lib/utils';

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
