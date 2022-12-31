import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
	borderRadius: theme.border.radii.lg,
	borderWidth: theme.space.px,
	borderStyle: 'solid',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	':focus': {
		outline: `${theme.sizes[0.5]} solid ${theme.themeColors.accent.base}`,
	},
});
