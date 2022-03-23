import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const table = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(1, 1fr)',
	gap: theme.sizes[6],
	'@media': {
		'screen and (min-width: 768px)': {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
		'screen and (min-width: 1024px)': {
			gridTemplateColumns: 'repeat(3, 1fr)',
		},
		'screen and (min-width: 1280px)': {
			gridTemplateColumns: 'repeat(4, 1fr)',
		},
	},
});
