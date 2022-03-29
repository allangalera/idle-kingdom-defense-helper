import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const flex = style({
	display: 'flex',
	gap: theme.space[1],
	flexWrap: 'wrap',
	borderWidth: theme.sizes.px,
	borderStyle: 'solid',
	borderColor: theme.themeColors.border.default,
	borderRadius: theme.border.radii.lg,
	padding: theme.space[2],
	justifyContent: 'center',
	alignItems: 'center',
});
export const details = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: theme.space[1],
	justifyContent: 'center',
	alignItems: 'center',
});

export const drop = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: theme.space[1],
	justifyContent: 'center',
	alignItems: 'center',
});
