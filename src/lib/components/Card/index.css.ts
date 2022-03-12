import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

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
	fontSize: theme.font.fontSizes.base,
	margin: 0,
	textShadow: '1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
});
