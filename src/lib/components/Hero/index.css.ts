import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '$lib/styles/themes/index.css';

export const outsideBorder = style({
	borderRadius: theme.border.radii.base,
	borderColor: 'black',
	borderWidth: theme.sizes.px,
	borderStyle: 'solid',
});

export const outsideBorderVariant = styleVariants({
	C: [outsideBorder, { background: theme.baseColor.heroTiers.C.darker }],
	B: [outsideBorder, { background: theme.baseColor.heroTiers.B.darker }],
	A: [outsideBorder, { background: theme.baseColor.heroTiers.A.darker }],
	S: [outsideBorder, { background: theme.baseColor.heroTiers.S.darker }],
});

export const hero = style({
	display: 'flex',
	flexDirection: 'column',
	borderRadius: theme.border.radii.base,
	overflow: 'hidden',
	borderWidth: theme.sizes[1],
	position: 'relative',
	width: '120px',
	borderStyle: 'solid',
});

export const heroVariant = styleVariants({
	C: [
		hero,
		{
			borderColor: theme.baseColor.heroTiers.C.darker,
			background: theme.baseColor.heroTiers.C.darker,
		},
	],
	B: [
		hero,
		{
			borderColor: theme.baseColor.heroTiers.B.darker,
			background: theme.baseColor.heroTiers.B.darker,
		},
	],
	A: [
		hero,
		{
			borderColor: theme.baseColor.heroTiers.A.darker,
			background: theme.baseColor.heroTiers.A.darker,
		},
	],
	S: [
		hero,
		{
			borderColor: theme.baseColor.heroTiers.S.darker,
			background: theme.baseColor.heroTiers.S.darker,
		},
	],
});

export const heroContainer = style({
	borderRadius: theme.border.radii.base,
	borderColor: 'black',
	borderWidth: theme.sizes.px,
	borderStyle: 'solid',
	overflow: 'hidden',
});

export const heroContainerVariant = styleVariants({
	C: [heroContainer, { background: theme.baseColor.heroTiers.C.lighter }],
	B: [heroContainer, { background: theme.baseColor.heroTiers.B.lighter }],
	A: [heroContainer, { background: theme.baseColor.heroTiers.A.lighter }],
	S: [heroContainer, { background: theme.baseColor.heroTiers.S.lighter }],
});

export const heroImageContainer = style({
	position: 'relative',
	flex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100%',
	aspectRatio: '1 / 1',
	overflow: 'hidden',
});

export const heroImage = style({
	maxWidth: '100%',
	maxHeight: '100%',
});

export const heroClass = style({
	width: theme.sizes[6],
	position: 'absolute',
	margin: theme.space[0.5],
	left: 0,
	top: 0,
});

export const heroType = style({
	width: theme.sizes[6],
	position: 'absolute',
	margin: theme.space[0.5],
	right: 0,
	top: 0,
});

const heroNameAndTierBase = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: `0 ${theme.space[1]}`,
});

export const heroNameAndTier = styleVariants({
	C: [heroNameAndTierBase, { background: [theme.baseColor.heroTiers.C.base] }],
	B: [heroNameAndTierBase, { background: [theme.baseColor.heroTiers.B.base] }],
	A: [heroNameAndTierBase, { background: [theme.baseColor.heroTiers.A.base] }],
	S: [heroNameAndTierBase, { background: [theme.baseColor.heroTiers.S.base] }],
});

export const tierBadge = style({
	maxHeight: theme.sizes[4],
});

export const heroName = style({
	color: theme.baseColor.white,
	fontSize: theme.font.fontSizes.base,
});
