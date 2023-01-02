import { CARD_TYPES, CART_TYPES_IMAGE_DATA } from './constants';
import type { CardTypes } from './type';
import { A, D, O } from '@mobily/ts-belt';

const isCardType = (value: unknown): value is CardTypes => {
	const cardTypeOptions = D.values(CARD_TYPES);
	return A.includes(cardTypeOptions, value);
};

export const returnCardTypeData = (cardType: O.Option<CardTypes>) => {
	if (!isCardType(cardType)) {
		return null;
	}

	return CART_TYPES_IMAGE_DATA[cardType];
};
