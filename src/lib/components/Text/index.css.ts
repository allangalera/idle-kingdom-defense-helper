import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const paragraph = style({
	fontFamily: theme.font.family.body,
	color: theme.colors.text.default,
	margin: 0,
	fontSize: theme.font.sizes.base,
});
