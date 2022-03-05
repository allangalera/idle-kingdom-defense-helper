import { style } from '@vanilla-extract/css';
import { theme } from '$lib/styles/themes/index.css';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.space[2],
});

export const input = style({
	fontFamily: theme.font.family.body,
	fontSize: theme.font.sizes.lg,
	borderRadius: theme.border.radii.base,
	background: theme.colors.background.default,
	color: theme.colors.text.default,
	borderWidth: theme.space.px,
	borderColor: theme.colors.border.default,
	borderStyle: 'solid',
	padding: theme.space[2],
	width: '100%',
	':hover': {
		borderColor: theme.colors.border.hover,
	},
	':focus': {
		boxShadow: `0 0 0 3px ${theme.colors.accent.base}`,
		outline: 'none',
	},
	'::selection': {
		background: theme.colors.accent.base,
		color: theme.baseColor.white,
	},
});
