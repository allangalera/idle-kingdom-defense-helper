import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const grid = style({
	width: '100%',
	display: 'grid',
	gridTemplateColumns: '1fr',
	paddingTop: theme.space[16],
	gap: theme.space[8]
});

export const breadcrumb = style({
	display: 'flex',
	gap: theme.space[2],
	justifyContent: 'flex-start',
	alignItems: 'center'
});
