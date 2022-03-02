import { style, styleVariants } from '@vanilla-extract/css';
import { tiers, contrastTextColor, borderRadius, fontSize0 } from '$lib/styles/vars.css';

export const outsideBorder = style({
	borderRadius: [borderRadius],
	borderColor: 'black',
	borderWidth: '1px',
	borderStyle: 'solid',
});

export const outsideBorderVariant = styleVariants({
	C: [outsideBorder, { background: tiers.C.darker }],
	B: [outsideBorder, { background: tiers.B.darker }],
	A: [outsideBorder, { background: tiers.A.darker }],
	S: [outsideBorder, { background: tiers.S.darker }],
});

export const hero = style({
	display: 'flex',
	flexDirection: 'column',
	borderRadius: [borderRadius],
	overflow: 'hidden',
	borderWidth: '4px',
	position: 'relative',
	width: '120px',
	borderStyle: 'solid',
});

export const heroVariant = styleVariants({
	C: [hero, { borderColor: tiers.C.darker, background: tiers.C.darker }],
	B: [hero, { borderColor: tiers.B.darker, background: tiers.B.darker }],
	A: [hero, { borderColor: tiers.A.darker, background: tiers.A.darker }],
	S: [hero, { borderColor: tiers.S.darker, background: tiers.S.darker }],
});

export const heroContainer = style({
	borderRadius: [borderRadius],
	borderColor: 'black',
	borderWidth: '1px',
	borderStyle: 'solid',
	overflow: 'hidden',
});

export const heroContainerVariant = styleVariants({
	C: [heroContainer, { background: tiers.C.lighter }],
	B: [heroContainer, { background: tiers.B.lighter }],
	A: [heroContainer, { background: tiers.A.lighter }],
	S: [heroContainer, { background: tiers.S.lighter }],
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
	width: '24px',
	position: 'absolute',
	margin: '2px',
	left: 0,
	top: 0,
});

export const heroType = style({
	width: '24px',
	position: 'absolute',
	margin: '2px',
	right: 0,
	top: 0,
});

const heroNameAndTierBase = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0 4px',
});

export const heroNameAndTier = styleVariants({
	C: [heroNameAndTierBase, { background: [tiers.C.base] }],
	B: [heroNameAndTierBase, { background: [tiers.B.base] }],
	A: [heroNameAndTierBase, { background: [tiers.A.base] }],
	S: [heroNameAndTierBase, { background: [tiers.S.base] }],
});

export const tierBadge = style({
	maxHeight: '16px',
});

export const heroName = style({
	color: [contrastTextColor],
	fontSize: [fontSize0],
});
