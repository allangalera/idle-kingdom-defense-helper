import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const buttoContainer = style({
	position: 'fixed',
	bottom: theme.space[4],
	right: theme.space[4],
	alignSelf: 'end',
	padding: theme.space[4],
	cursor: 'pointer',
});

export const menuIcon = style({
	width: theme.sizes[8],
	height: theme.sizes[8],
});

export const iconContainer = style({
	cursor: 'pointer',
});

export const menuContainer = style({
	position: 'fixed',
	top: 0,
	bottom: 0,
	right: 0,
	alignSelf: 'end',
	height: '100vh',
	minWidth: theme.sizes[56],
	padding: theme.space[6],
	background: theme.themeColors.baseColors.slate6,
	display: 'flex',
	flexDirection: 'column',
	gap: theme.space[4],
	zIndex: 1200,
});

export const menuHeader = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
});

export const menu = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.space[4],
	flex: 1,
});

export const menuFooter = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.space[4],
});
