import type { CARD_TYPES } from './constants';

export type CardTypes = typeof CARD_TYPES[keyof typeof CARD_TYPES];

export type CardTypeData = Record<
	CardTypes,
	{
		src: string;
		alt: string;
	}
>;
