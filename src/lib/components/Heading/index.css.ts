import { theme } from '$lib/styles/themes/index.css';
import type { FontSizes } from '$lib/styles/themes/index.css';
import { generateVariantOptionsFromObject } from '$lib/utils';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const heading = style({
	fontFamily: theme.font.family.heading,
	fontSize: theme.font.sizes['2xl'],
	color: theme.colors.text.default,
	margin: 0,
	fontWeight: 600,
});

export const headingRecipe = recipe({
	base: heading,
	variants: {
		fontSize: generateVariantOptionsFromObject<Record<FontSizes, { fontSize: string }>>(
			theme.font.sizes,
			'fontSize'
		),
	},
});
