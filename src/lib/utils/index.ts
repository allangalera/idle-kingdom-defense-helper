import { MAX_HERO_LEVEL } from '$lib/constants';
import { RarityEnum } from '$lib/enums';
import type { Grades, UpgradeLevel } from '$lib/types';
import { nanoid } from 'nanoid';
import { match } from 'oxide.ts';
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
	let formattedString = Math.floor(value).toString();
	if (value >= 10000000000) {
		formattedString = Math.floor(value / 1000000000).toString() + 'B';
	} else if (value >= 10000000) {
		formattedString = Math.floor(value / 1000000).toString() + 'M';
	} else if (value >= 100000) {
		formattedString = Math.floor(value / 1000).toString() + 'K';
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

export const romanize = (num: number) => {
	if (isNaN(num)) return NaN;
	const digits = String(+num).split('');
	const key = [
		'',
		'C',
		'CC',
		'CCC',
		'CD',
		'D',
		'DC',
		'DCC',
		'DCCC',
		'CM',
		'',
		'X',
		'XX',
		'XXX',
		'XL',
		'L',
		'LX',
		'LXX',
		'LXXX',
		'XC',
		'',
		'I',
		'II',
		'III',
		'IV',
		'V',
		'VI',
		'VII',
		'VIII',
		'IX',
	];
	let roman = '';
	let i = 3;
	while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
	return Array(+digits.join('') + 1).join('M') + roman;
};

export const convertGradeToStarLevel = (
	grade: Grades
): { rarity: RarityEnum; level: UpgradeLevel } => {
	const level = match(grade % 5, [[0, 5], (n) => n]) as UpgradeLevel;

	const rarity = match(grade / 5, [
		[(n) => n <= 1, RarityEnum.common],
		[(n) => n <= 2, RarityEnum.uncommon],
		[(n) => n <= 3, RarityEnum.rare],
		[(n) => n <= 4, RarityEnum.epic],
		() => RarityEnum.legendary,
	]);

	return { rarity, level };
};
