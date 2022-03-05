import { style } from '@vanilla-extract/css';
import { theme } from '$lib/styles/themes/index.css';

export const header = style({});

export const container = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	maxWidth: theme.breakpoints.xl,
	margin: '0 auto',
	padding: theme.space[8],
	position: 'relative',
});

export const middle = style({
	flex: 1,
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	textAlign: 'left',
	'@media': {
		'screen and (min-width: 768px)': {
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
		},
	},
});

export const sides = style({
	flex: 1,
	gap: theme.space[2],
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
		position: 'absolute',
		right: theme.space[8],
	},
]);

export const button = style({
	background: theme.colors.background.default,
	color: theme.colors.text.default,
});
