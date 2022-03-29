import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const tableItem = style({
	borderWidth: theme.sizes.px,
	borderStyle: 'solid',
	borderColor: theme.themeColors.border.default,
	borderRadius: theme.border.radii.lg,
	display: 'flex',
	flexDirection: 'column',
	gap: theme.sizes[4],
	overflow: 'hidden',
});

export const tableItemLeft = style({
	display: 'flex',
	background: theme.themeColors.baseColors.slate3,
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const cardInfoContainer = style({
	display: 'flex',
	padding: theme.space[2],
	gap: theme.space[2],
});

export const infoContainer = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	gap: theme.space[1],
});

export const basicInfo = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.space[1],
});

export const heroNameAndTier = style({
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	gap: theme.space[2],
});

export const tierIcon = style({
	height: theme.sizes[4],
});

export const statsContainer = style({
	display: 'flex',
	gap: theme.space[2],
});

export const stats = style({
	display: 'flex',
	gap: theme.space[0.5],
	justifyContent: 'center',
	alignItems: 'center',
});

export const statsIcons = style({
	height: theme.sizes[4],
});

export const buttonIcons = style({
	width: theme.sizes[4],
	height: theme.sizes[4],
});

export const actions = style({
	display: 'flex',
	flexDirection: 'column',
	borderLeftWidth: theme.sizes.px,
	borderLeftColor: theme.themeColors.baseColors.slate9,
	borderLeftStyle: 'solid',
	height: '100%',
});

export const actionButton = style({
	flex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: theme.space[2],
	cursor: 'pointer',
});

export const actionButtonVariant = styleVariants({
	success: [
		actionButton,
		{
			background: theme.themeColors.baseColors.green9,
		},
	],
	primary: [
		actionButton,
		{
			background: theme.themeColors.baseColors.slate7,
		},
	],
	danger: [
		actionButton,
		{
			background: theme.themeColors.baseColors.red9,
		},
	],
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
	gridTemplateRows: `auto auto`,
	'@media': {
		'screen and (min-width: 768px)': {
			gridTemplateRows: `${theme.space[20]} auto`,
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
	borderRadius: theme.border.radii.lg,
	position: 'relative',
	width: '100%',
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
	gap: theme.space[2],
	display: 'flex',
	justifyContent: 'space-between',
	'@media': {
		'screen and (min-width: 768px)': {
			gap: theme.space[4],
		},
	},
});

export const skillMinimal = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: theme.space[4],
	flex: 1,
});
