import { castleConst, castleEngrave } from '$lib/db/castle';

export const calculateExpRatio = () => {
	const { RATES_COIN, RATES_CASH } = castleConst.ENGRAVE;
	const result = {
		coin: {
			min: 0,
			avg: 0,
			max: 0,
		},
		cash: {
			min: 0,
			avg: 0,
			max: 0,
		},
	};

	castleConst.ENGRAVE.EXPS.forEach((item, index) => {
		const currentCoinRate = RATES_COIN[index];
		const currentCashRate = RATES_CASH[index];

		if (currentCoinRate == null) return;
		if (currentCashRate == null) return;

		if (!result.coin.min && currentCoinRate) {
			result.coin.min = item;
		}

		if (!result.cash.min && currentCashRate) {
			result.cash.min = item;
		}

		if (currentCoinRate) {
			result.coin.max = item;
		}

		if (currentCashRate) {
			result.cash.max = item;
		}

		result.coin.avg += item * currentCoinRate;
		result.cash.avg += item * currentCashRate;
	});

	return result;
};

export const calculateCasteEngraving = (startLevel: number, endLevel: number) => {
	const result = {
		def: 0,
		coin: {
			min: 0,
			avg: 0,
			max: 0,
		},
		cash: {
			min: 0,
			avg: 0,
			max: 0,
		},
	};
	const ratio = calculateExpRatio();
	for (const engrave of castleEngrave) {
		if (startLevel < engrave.level && endLevel >= engrave.level) {
			result.def = engrave.def;
			result.coin.min += engrave.costCoin * (castleConst.ENGRAVE.EXP / ratio.coin.min);
			result.cash.min += engrave.costCash * (castleConst.ENGRAVE.EXP / ratio.cash.min);
			result.coin.avg += engrave.costCoin * (castleConst.ENGRAVE.EXP / ratio.coin.avg);
			result.cash.avg += engrave.costCash * (castleConst.ENGRAVE.EXP / ratio.cash.avg);
			result.coin.max += engrave.costCoin * (castleConst.ENGRAVE.EXP / ratio.coin.max);
			result.cash.max += engrave.costCash * (castleConst.ENGRAVE.EXP / ratio.cash.max);
		}
	}
	return result;
};
