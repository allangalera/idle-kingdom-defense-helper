import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	width: '100%',
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.space[8],
});

export const tierHeaderImage = style({
	maxWidth: '100%',
});
export const heroesContainer = style({
	width: '100%',
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.space[8],
});
