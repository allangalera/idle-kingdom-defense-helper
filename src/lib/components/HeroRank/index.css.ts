import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: `${theme.space[32]} repeat(13, ${theme.space[24]})`,
  // gap: theme.space[2],
  overflow: 'auto',
  borderRadius: theme.border.radii.lg,
  maxWidth: theme.sizes.full,
  '::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  background: theme.themeColors.baseColors.gray3,
});

export const titleContianerBase = style({
  position: 'sticky',
  left: 0,
  zIndex: 900,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.space[2],
});

export const titleContainerVariant = styleVariants({
  rank0: [titleContianerBase, { background: theme.baseColor.tierList[0] }],
  rank1: [titleContianerBase, { background: theme.baseColor.tierList[1] }],
  rank2: [titleContianerBase, { background: theme.baseColor.tierList[2] }],
  rank3: [titleContianerBase, { background: theme.baseColor.tierList[3] }],
  rank4: [titleContianerBase, { background: theme.baseColor.tierList[4] }],
  rank5: [titleContianerBase, { background: theme.baseColor.tierList[5] }],
  rank6: [titleContianerBase, { background: theme.baseColor.tierList[6] }],
  rank7: [titleContianerBase, { background: theme.baseColor.tierList[7] }],
  rank8: [titleContianerBase, { background: theme.baseColor.tierList[8] }],
  rank9: [titleContianerBase, { background: theme.baseColor.tierList[9] }],
  rank10: [titleContianerBase, { background: theme.baseColor.tierList[10] }],
  rank11: [titleContianerBase, { background: theme.baseColor.tierList[11] }],
  rank12: [titleContianerBase, { background: theme.baseColor.tierList[12] }],
  rank13: [titleContianerBase, { background: theme.baseColor.tierList[13] }],
  rank14: [titleContianerBase, { background: theme.baseColor.tierList[14] }],
});

export const columnVariant = styleVariants({
  default: {},
  double: {
    gridRow: 'span 2',
  },
});
