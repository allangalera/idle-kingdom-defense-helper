import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({});

export const gradeContainer = style({
	display: 'flex',
	justifyContent: 'space-between',
});

export const icons = style({
	width: theme.sizes[6],
	height: theme.sizes[6],
});
