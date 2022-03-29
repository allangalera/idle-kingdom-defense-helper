import { style } from '@vanilla-extract/css';
import { theme } from '$lib/styles/themes/index.css';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.space[2],
});

export const input = style({
	fontFamily: theme.font.family.body,
	fontSize: theme.font.fontSizes.lg,
	borderRadius: theme.border.radii.lg,
	color: theme.themeColors.text.default,
	background: 'transparent',
	borderWidth: theme.space.px,
	borderColor: theme.themeColors.border.default,
	borderStyle: 'solid',
	padding: theme.space[2],
	width: '100%',
	':hover': {
		borderColor: theme.themeColors.border.hover,
	},
	':focus': {
		boxShadow: `0 0 0 3px ${theme.themeColors.accent.base}`,
		outline: 'none',
	},
	'::selection': {
		background: theme.themeColors.accent.base,
		color: theme.baseColor.white,
	},
});
