import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const shadow = style({
	filter: `drop-shadow(0px 0px 2px rgb(0 0 0 / 0.6))`,
	width: theme.sizes[8],
	height: theme.sizes[8],
});

export const fade = style({
	opacity: 0.15,
});
