import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const button = style({
	fontFamily: theme.font.family.body,
	background: theme.colors.text.default,
	color: theme.colors.background.default,
	padding: theme.space[2],
	borderRadius: theme.border.radii.base,
	border: 'none',
});
