import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	padding: theme.space[4],
	gap: theme.space[2],
});

export const socialIconsContainer = style({
	display: 'flex',
	gap: theme.space[4],
});

export const svelteIcon = style({
	marginLeft: theme.space[1],
});

export const redditIcon = style({
	background: 'radial-gradient(#fff 10%, #fff 50%, transparent 51%, transparent)',
	width: theme.sizes[8],
	height: theme.sizes[8],
});

export const discordIcon = style({
	background: 'radial-gradient(#fff 10%, #fff 50%, transparent 51%, transparent)',
	width: theme.sizes[8],
	height: theme.sizes[8],
});

export const anchor = style({
	color: theme.themeColors.secondary.base,
	':focus': {
		boxShadow: `0 0 0 3px ${theme.themeColors.accent.base}`,
		border: 'none',
		outline: 'none',
	},
});
