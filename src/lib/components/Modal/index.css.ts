import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const wrapper = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: theme.colors.blackBG,
	zIndex: 1100,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const container = style({
	background: theme.themeColors.baseColors.slate1,
	borderRadius: theme.border.radii.base,
	minWidth: theme.sizes[80],
});

export const header = style({
	padding: theme.space[4],
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
});

export const headerContainer = style({
	flex: 1,
	paddingRight: calc(theme.space[4]).add(theme.sizes[6]).toString(),
	paddingLeft: calc(theme.space[4]).add(theme.sizes[6]).toString(),
});

export const headerCloseIconContainer = style({
	display: 'flex',
	alignItems: 'center',
	position: 'absolute',
	right: theme.space[4],
});

export const headerCloseIcon = style({
	width: theme.sizes[6],
	height: theme.sizes[6],
	cursor: 'pointer',
});

export const content = style({
	padding: theme.space[4],
});
export const footer = style({
	padding: theme.space[4],
	display: 'flex',
	gap: theme.space[2],
});
