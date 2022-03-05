import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
	position: 'relative',
	// width: '100%',
	width: theme.sizes[24],
	height: 'auto',
	aspectRatio: '1 / 1',
	// padding: theme.space.px,
	padding: '0.09rem',
	overflow: 'hidden',
	background: '#000000',
	clipPath: `polygon(
    0 10%,
    10% 0,
    90% 0,
    100% 10%,
    100% 90%,
    90% 100%,
    10% 100%,
    0% 90%,
    0% 10%
  )`,
});

export const container = style({
	position: 'relative',
	width: '100%',
	height: '100%',
	padding: theme.space[1],
	overflow: 'hidden',
	background: '#6a7686',
	boxShadow: `0px 0px 6px 7px rgb(0 0 0 / 100%)`,
	clipPath: `polygon(
    0 10%,
    10% 0,
    90% 0,
    100% 10%,
    100% 90%,
    90% 100%,
    10% 100%,
    0% 90%,
    0% 10%
  )`,
});

export const border2 = style({
	width: '100%',
	height: '100%',
	padding: '0.09rem',
	overflow: 'hidden',
	background: '#000000',
	clipPath: `polygon(
    0 10%,
    10% 0,
    90% 0,
    100% 10%,
    100% 90%,
    90% 100%,
    10% 100%,
    0% 90%,
    0% 10%
  )`,
});

export const inner = style({
	position: 'relative',
	width: '100%',
	height: '100%',
	overflow: 'hidden',
	background: '#3e372f',
	boxShadow: `inset -1px 1px 1px 1px rgb(0 0 0 / 20%), inset -1px -1px 6px 7px rgb(0 0 0 / 20%)`,
	clipPath: `polygon(
    0 10%,
    10% 0,
    90% 0,
    100% 10%,
    100% 90%,
    90% 100%,
    10% 100%,
    0% 90%,
    0% 10%
  )`,
});

export const teste = style({
	display: 'grid',
	width: '100%',
	height: '100%',
	gridTemplateRows: 'repeat(8, 1fr)',
});

export const imgContainer = style({
	gridRow: '2 / span 5',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const img = style({
	maxWidth: '100%',
	maxHeight: '100%',
});

export const textContainer = style({
	gridRow: '7 / span 2',
	textAlign: 'center',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontWeight: 600,
	color: theme.baseColor.white,
	fontFamily: theme.font.family.body,
	fontSize: theme.font.sizes.base,
	margin: 0,
});
