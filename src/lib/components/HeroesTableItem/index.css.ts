import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const tableItem = style({
	borderWidth: theme.sizes.px,
	borderStyle: 'solid',
	borderColor: theme.themeColors.border.default,
	borderRadius: theme.border.radii.base,
	display: 'flex',
	flexDirection: 'column',
	gap: theme.sizes[4],
});

export const tableItemLeft = style({
	display: 'flex',
	background: theme.themeColors.baseColors.slate3,
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: theme.sizes[2],
});

export const tableItemRight = style({
	flex: 1,
	padding: theme.sizes[2],
	gap: theme.space[4],
	display: 'flex',
	flexDirection: 'column',
});

export const skill = style({
	display: 'grid',
	gap: theme.space[3],
	gridTemplateColumns: 'auto 1fr',
	gridTemplateRows: `${theme.space[20]} auto`,
	'@media': {
		'screen and (min-width: 768px)': {
			gridTemplateRows: `auto auto`,
		},
	},
});

export const skillImage = style({
	width: theme.sizes[10],
	height: theme.sizes[10],
});

export const skillDescription = style({
	gridColumn: '1 / span 2',
	display: 'flex',
	justifyContent: 'space-between',
	gap: theme.space[2],
});

export const skillProgression = style({
	flex: 1,
	lineHeight: 2,
	borderWidth: theme.sizes.px,
	borderStyle: 'solid',
	borderRadius: theme.border.radii.base,
	position: 'relative',
});

export const skillProgressionGrade = style({
	position: 'absolute',
	width: theme.sizes[3],
	height: theme.sizes[3],
	borderRadius: theme.border.radii.full,
	left: '50%',
	top: 0,
	transform: 'translateX(-50%)',
	marginTop: calc(theme.space[2]).negate().toString(),
});

export const tableItemRightMinimal = style({
	padding: theme.sizes[2],
	gap: theme.space[4],
	display: 'flex',
	justifyContent: 'space-between',
});

export const skillMinimal = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.space[4],
});
