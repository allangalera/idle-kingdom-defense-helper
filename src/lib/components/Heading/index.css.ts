import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const heading = style({
	fontFamily: theme.font.family.heading,
	color: theme.colors.text.default,
	margin: 0,
	fontWeight: 600,
	'::selection': {
		background: theme.colors.accent.base,
		color: theme.baseColor.white,
	},
});

export const headingVariant = styleVariants({
	default: [heading],
	xs: [heading, { fontSize: theme.font.sizes.xs }],
	sm: [heading, { fontSize: theme.font.sizes.sm }],
	base: [heading, { fontSize: theme.font.sizes.base }],
	lg: [heading, { fontSize: theme.font.sizes.lg }],
	xl: [heading, { fontSize: theme.font.sizes.xl }],
	'2xl': [heading, { fontSize: theme.font.sizes['2xl'] }],
	'3xl': [heading, { fontSize: theme.font.sizes['3xl'] }],
	'4xl': [heading, { fontSize: theme.font.sizes['4xl'] }],
	'5xl': [heading, { fontSize: theme.font.sizes['5xl'] }],
	'6xl': [heading, { fontSize: theme.font.sizes['6xl'] }],
	'7xl': [heading, { fontSize: theme.font.sizes['7xl'] }],
	'8xl': [heading, { fontSize: theme.font.sizes['8xl'] }],
	'9xl': [heading, { fontSize: theme.font.sizes['9xl'] }],
});
