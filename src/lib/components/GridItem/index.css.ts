import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
	borderWidth: theme.space.px,
	borderStyle: 'solid',
	borderColor: theme.colors.border.default,
	borderRadius: theme.border.radii.base,
});

export const containerVariant = styleVariants({
	default: [container],
	full: [
		container,
		{
			'@media': {
				'screen and (min-width: 768px)': {
					gridColumn: '1 / span 2',
				},
			},
		},
	],
});

export const title = style({
	color: theme.colors.text.default,
	padding: theme.space[2],
	textAlign: 'center',
	borderWidth: 0,
	borderBottomWidth: theme.space.px,
	borderColor: theme.colors.border.default,
	borderStyle: 'solid',
	fontSize: theme.font.sizes['2xl'],
});

export const content = style({
	padding: theme.space[2],
});
