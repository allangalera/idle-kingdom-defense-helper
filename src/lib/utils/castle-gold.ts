import { CASTLE_MAX_LEVEL } from '$lib/constants';
import { castleCost } from '$lib/db/castle';
import { A } from '@mobily/ts-belt';
import { z } from 'zod';

export const calculateCastleUpgradeCostWithMapParameterSchema = z
	.object({
		currentLevel: z.number().gt(0),
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

export const calculateCastleUpgradeCost: CalculateCastleUpgradeCostWithMapFunction = (
	parameters,
) => {
	const validation = calculateCastleUpgradeCostWithMapParameterSchema.safeParse(parameters);
	if (!validation.success) {
		return 0;
	}
	const { currentLevel, targetLevel } = parameters;
	let result = 0;
	for (let level = currentLevel; level < targetLevel; level++) {
		const costData = A.reverse(castleCost).find((item) => item.level <= level);
		if (costData) {
			result += Math.round(costData.initCost + (level - costData.level) * costData.incCost);
		}
	}
	return result;
};
