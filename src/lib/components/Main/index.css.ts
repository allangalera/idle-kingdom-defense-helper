import { style } from '@vanilla-extract/css';
import { theme } from '$lib/styles/themes/index.css';

export const container = style({
	background: theme.colors.background.default,
	width: '100%',
	margin: '0 auto',
	maxWidth: theme.breakpoints.xl,
	padding: theme.space[8],
	flex: 1,
});
