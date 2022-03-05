import { MAX_HERO_LEVEL } from '$lib/constants';
import { nanoid } from 'nanoid';
import { z } from 'zod';

export const addIdToCollection = <T>(collection: T[]): (T & { id: string })[] => {
	return collection.map((item) => {
		return {
			...item,
			id: nanoid(),
		};
	});
};

export const createSortByListAndName = (tierList) => (array) => {
	const clonedArray = array.slice();
	const sortFunction = (prev, curr) => {
		const prevTier = tierList.indexOf(prev.tier.name);
		const currTier = tierList.indexOf(curr.tier.name);
		if (prevTier > currTier) return 1;
		if (prevTier < currTier) return -1;
		if (prev.name > curr.name) return 1;
		if (prev.name < curr.name) return -1;

		return 0;
	};

	return clonedArray.sort(sortFunction);
};

export const getIdleKingdomNumberFormat = (value: number): string => {
	let formattedString = value.toString();
	if (value >= 10000000000) {
		formattedString = Math.round(value / 1000000000).toString() + 'B';
	} else if (value >= 10000000) {
		formattedString = Math.round(value / 1000000).toString() + 'M';
	} else if (value >= 100000) {
		formattedString = Math.round(value / 1000).toString() + 'K';
	}

	return formattedString;
};

export const heroUpgradeCostCalculatorParameterSchema = z
	.object({
		currentLevel: z.number().gte(0),
	})
	.extend({
		targetLevel: z.number().lte(MAX_HERO_LEVEL),
	})
	.refine((value) => value.currentLevel < value.targetLevel, {
		message: 'Current level need to be higher than Target level',
	});

export const generateVariantOptionsFromObject = <T>(styleObject, style: string) => {
	const finalStyle = {};
	Object.keys(styleObject).forEach((item) => {
		finalStyle[item] = {
			[style]: styleObject[item],
		};
	});

	return finalStyle as T;
};
