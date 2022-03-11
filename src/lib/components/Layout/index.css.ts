import { style } from '@vanilla-extract/css';
import { theme } from '$lib/styles/themes/index.css';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	background: theme.themeColors.background.default,
});
