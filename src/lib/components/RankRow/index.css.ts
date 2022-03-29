import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '$lib/styles/themes/index.css';

export const container = style({
	display: 'flex',
	flexDirection: 'row',
	background: '#202020',
	borderRadius: [theme.border.radii.lg],
	overflow: 'hidden',
	maxWidth: '1250px',
});

export const containerVariant = styleVariants({
	rank0: [container, { borderColor: theme.baseColor.tierList[0] }],
	rank1: [container, { borderColor: theme.baseColor.tierList[1] }],
	rank2: [container, { borderColor: theme.baseColor.tierList[2] }],
	rank3: [container, { borderColor: theme.baseColor.tierList[3] }],
	rank4: [container, { borderColor: theme.baseColor.tierList[4] }],
	rank5: [container, { borderColor: theme.baseColor.tierList[5] }],
	rank6: [container, { borderColor: theme.baseColor.tierList[6] }],
	rank7: [container, { borderColor: theme.baseColor.tierList[7] }],
	rank8: [container, { borderColor: theme.baseColor.tierList[8] }],
	rank9: [container, { borderColor: theme.baseColor.tierList[9] }],
	rank10: [container, { borderColor: theme.baseColor.tierList[10] }],
	rank11: [container, { borderColor: theme.baseColor.tierList[11] }],
	rank12: [container, { borderColor: theme.baseColor.tierList[12] }],
	rank13: [container, { borderColor: theme.baseColor.tierList[13] }],
	rank14: [container, { borderColor: theme.baseColor.tierList[14] }],
});

const titleContianerBase = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '4px',
	width: '112px',
	minWidth: '112px',
});

export const titleContainerVariant = styleVariants({
	rank0: [titleContianerBase, { borderColor: theme.baseColor.tierList[0] }],
	rank1: [titleContianerBase, { borderColor: theme.baseColor.tierList[1] }],
	rank2: [titleContianerBase, { borderColor: theme.baseColor.tierList[2] }],
	rank3: [titleContianerBase, { borderColor: theme.baseColor.tierList[3] }],
	rank4: [titleContianerBase, { borderColor: theme.baseColor.tierList[4] }],
	rank5: [titleContianerBase, { borderColor: theme.baseColor.tierList[5] }],
	rank6: [titleContianerBase, { borderColor: theme.baseColor.tierList[6] }],
	rank7: [titleContianerBase, { borderColor: theme.baseColor.tierList[7] }],
	rank8: [titleContianerBase, { borderColor: theme.baseColor.tierList[8] }],
	rank9: [titleContianerBase, { borderColor: theme.baseColor.tierList[9] }],
	rank10: [titleContianerBase, { borderColor: theme.baseColor.tierList[10] }],
	rank11: [titleContianerBase, { borderColor: theme.baseColor.tierList[11] }],
	rank12: [titleContianerBase, { borderColor: theme.baseColor.tierList[12] }],
	rank13: [titleContianerBase, { borderColor: theme.baseColor.tierList[13] }],
	rank14: [titleContianerBase, { borderColor: theme.baseColor.tierList[14] }],
});

export const heroesContainer = style({
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	gap: '4px',
	padding: '4px',
});

export const title = style({
	color: theme.themeColors.text.default,
	textAlign: 'center',
});
