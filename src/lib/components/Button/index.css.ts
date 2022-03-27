import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	borderRadius: theme.border.radii.base,
	padding: theme.space[2],
	borderWidth: theme.space.px,
	borderStyle: 'solid',
});
