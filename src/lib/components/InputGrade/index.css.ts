import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({});

export const starIcon = style({});

export const imageVariant = styleVariants({
	default: [starIcon, {}],
	disabled: [
		starIcon,
		{
			opacity: 0.15,
		},
	],
});
