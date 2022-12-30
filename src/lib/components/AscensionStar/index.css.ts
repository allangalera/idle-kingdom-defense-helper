import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const button = style({
	cursor: 'pointer',
});

export const shadow = style({
	filter: `drop-shadow(0px 0px 2px rgb(0 0 0 / 0.6))`,
	width: theme.sizes[8],
	height: theme.sizes[8],
});

export const fade = style({
	opacity: 0.15,
});

export const icon = style({
	width: theme.sizes[10],
	height: theme.sizes[10],
	fill: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255, 255, 255,1) 50%, rgba(247,222,9,1) 63%, rgba(210,190,23,1) 67%, rgba(184,168,32,1) 100%)',
});

export const iconVariant = styleVariants({
	default: [icon],
	fade: [icon, fade],
});
