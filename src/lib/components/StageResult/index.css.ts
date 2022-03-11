import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const flex = style({
	display: 'flex',
	gap: theme.space[4],
	flexWrap: 'wrap',
});
