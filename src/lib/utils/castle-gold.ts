import { CASTLE_INITIAL_UPGRADE_COST, CASTLE_MAX_LEVEL } from '$lib/constants';
import { z } from 'zod';

export const calculateCastleUpgradeCost = (currentLevel: number, targetLevel: number) => {
	let levelUpgradeCost = CASTLE_INITIAL_UPGRADE_COST;
	let result = 0;
	for (let level = 1; level < targetLevel; level++) {
		levelUpgradeCost += getLevelIncrement(level);
		if (level >= currentLevel && level < targetLevel) result += levelUpgradeCost;
	}
	return result;
};

export const getLevelIncrement = (level: number) => {
	const roundedValue = Math.floor(level / 500 - 0.0021);
	return roundedValue <= 20 ? (roundedValue + 1) * 10 : 210;
};

export const calculateCastleUpgradeCostWithMapParameterSchema = z
	.object({
		currentLevel: z.number().gte(0),
	})
	.extend({
		targetLevel: z.number().lte(CASTLE_MAX_LEVEL),
	})
	.refine((value) => value.currentLevel < value.targetLevel, {
		message: 'Current level need to be higher than Target level',
	});

type CalculateCastleUpgradeCostWithMapFunction = (parameter: {
	currentLevel: number;
	targetLevel: number;
}) => number;

export const calculateCastleUpgradeCostWithMap: CalculateCastleUpgradeCostWithMapFunction = (
	parameters
) => {
	const validation = calculateCastleUpgradeCostWithMapParameterSchema.safeParse(parameters);
	if (!validation.success) {
		return 0;
	}
	const { currentLevel, targetLevel } = parameters;
	let levelUpgradeCost = CASTLE_INITIAL_UPGRADE_COST;
	let result = 0;
	for (let level = 1; level < targetLevel; level++) {
		levelUpgradeCost += getLevelIncrement(level);
		if (level >= currentLevel && level < targetLevel) result += levelUpgradeCost;
	}
	return result;
};
