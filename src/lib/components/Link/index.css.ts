import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const anchor = style({
	color: theme.themeColors.secondary.base,
	':focus': {
		boxShadow: `0 0 0 3px ${theme.themeColors.accent.base}`,
		border: 'none',
		outline: 'none',
	},
});
