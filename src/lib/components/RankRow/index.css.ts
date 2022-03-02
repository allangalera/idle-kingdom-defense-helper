import { style, styleVariants } from '@vanilla-extract/css';
import { borderRadius, defaultTextColor, tierList } from '$lib/styles/vars.css';

export const container = style({
	display: 'flex',
	flexDirection: 'row',
	background: '#202020',
	borderRadius: [borderRadius],
	overflow: 'hidden',
	maxWidth: '1250px',
});

export const containerVariant = styleVariants({
	rank0: [container, { borderColor: tierList.rank0 }],
	rank1: [container, { borderColor: tierList.rank1 }],
	rank2: [container, { borderColor: tierList.rank2 }],
	rank3: [container, { borderColor: tierList.rank3 }],
	rank4: [container, { borderColor: tierList.rank4 }],
	rank5: [container, { borderColor: tierList.rank5 }],
	rank6: [container, { borderColor: tierList.rank6 }],
	rank7: [container, { borderColor: tierList.rank7 }],
	rank8: [container, { borderColor: tierList.rank8 }],
	rank9: [container, { borderColor: tierList.rank9 }],
	rank10: [container, { borderColor: tierList.rank10 }],
	rank11: [container, { borderColor: tierList.rank11 }],
	rank12: [container, { borderColor: tierList.rank12 }],
	rank13: [container, { borderColor: tierList.rank13 }],
	rank14: [container, { borderColor: tierList.rank14 }],
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
	rank0: [titleContianerBase, { background: tierList.rank0 }],
	rank1: [titleContianerBase, { background: tierList.rank1 }],
	rank2: [titleContianerBase, { background: tierList.rank2 }],
	rank3: [titleContianerBase, { background: tierList.rank3 }],
	rank4: [titleContianerBase, { background: tierList.rank4 }],
	rank5: [titleContianerBase, { background: tierList.rank5 }],
	rank6: [titleContianerBase, { background: tierList.rank6 }],
	rank7: [titleContianerBase, { background: tierList.rank7 }],
	rank8: [titleContianerBase, { background: tierList.rank8 }],
	rank9: [titleContianerBase, { background: tierList.rank9 }],
	rank10: [titleContianerBase, { background: tierList.rank10 }],
	rank11: [titleContianerBase, { background: tierList.rank11 }],
	rank12: [titleContianerBase, { background: tierList.rank12 }],
	rank13: [titleContianerBase, { background: tierList.rank13 }],
	rank14: [titleContianerBase, { background: tierList.rank14 }],
});

export const heroesContainer = style({
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	gap: '4px',
	padding: '4px',
});

export const title = style({
	color: [defaultTextColor],
	textAlign: 'center',
});
