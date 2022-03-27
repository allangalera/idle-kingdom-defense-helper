import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(5, 1fr)',
	justifyContent: 'center',
	alignItems: 'center',
	width: 'max-content',
	margin: '0 auto',
});

export const centerFlex = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const kingdomName = style({
	borderStyle: 'solid',
	borderWidth: theme.sizes.px,
	borderRadius: theme.border.radii.base,
	padding: theme.space[1],
	paddingLeft: theme.space[0.5],
	paddingRight: theme.space[0.5],
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const ascensionIcon = style({
	width: theme.sizes[6],
});
