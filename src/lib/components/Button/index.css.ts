import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const button = style({
	cursor: ' pointer',
	fontFamily: theme.font.family.body,
	backgroundColor: 'transparent',
	color: theme.colors.text.default,
	padding: theme.space[2],
	borderRadius: theme.border.radii.base,
	borderWidth: theme.space.px,
	borderColor: theme.colors.accent.base,
	borderStyle: 'solid',
	':hover': {
		backgroundColor: theme.colors.accent.transparency,
	},
	':focus': {
		boxShadow: `0 0 0 3px ${theme.colors.accent.base}`,
		outline: 'none',
	},
});
