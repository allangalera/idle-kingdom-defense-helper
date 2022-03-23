import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, auto)',
	justifyContent: 'center',
	alignItems: 'center',
	gap: theme.space[4],
});

export const kingdomNameContainer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const kingdomName = style({
	borderStyle: 'solid',
	borderWidth: theme.sizes.px,
	borderRadius: theme.border.radii.base,
	padding: theme.space[2],
	width: theme.sizes[24],
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});
