import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const flex = style({
	display: 'flex',
	gap: theme.space[1],
	flexWrap: 'wrap',
	border: '1px solid white',
	borderRadius: theme.border.radii.base,
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
