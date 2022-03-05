import { style } from '@vanilla-extract/css';
import { theme } from '$lib/styles/themes/index.css';

export const container = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: theme.space[3],
	background: theme.colors.header.default,
});
export const middle = style({
	flex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
});

export const sides = style({
	flex: 1,
});

export const left = style([
	sides,
	{
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
]);

export const right = style([
	sides,
	{
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
]);

export const button = style({
	background: theme.colors.background.default,
	color: theme.colors.text.default,
});
