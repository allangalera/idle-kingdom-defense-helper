import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const table2Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
});

export const table3Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

export const table4Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
});

export const table6Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
});

export const table7Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
});

export const table8Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  overflowX: 'auto',
});

export const table9Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(9, 1fr)',
});

export const table11Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(11, 1fr)',
});

export const table28Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(28, 1fr)',
  overflowX: 'auto',
});

export const tableRow = style({
  display: 'contents',
});

export const tableOtherRow = style({});

export const tableRowHighLight = style({});

export const tableRowVariant = styleVariants({
  row: [tableRow],
  otherRow: [tableRow, tableOtherRow],
  highlight: [tableRow, tableRowHighLight],
});

export const tableHeaderItem = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: theme.space[4],
  paddingLeft: theme.space[2],
  paddingRight: theme.space[2],
});

export const tableItem = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.space[1],
  minWidth: theme.sizes.max,
  background: theme.themeColors.baseColors.gray1,
  selectors: {
    [`${tableOtherRow} &`]: {
      background: theme.themeColors.baseColors.gray5,
    },
    [`${tableRowHighLight} &`]: {
      background: theme.themeColors.baseColors.green8,
    },
  },
});
