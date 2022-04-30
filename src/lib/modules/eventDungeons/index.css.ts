import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const grid = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  paddingTop: theme.space[16],
  gap: theme.space[8],
  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
});

export const table3Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  // gap: theme.space[2],
  // justifyContent: 'center',
  // alignItems: 'center',
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
});

export const tableItem = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
  selectors: {
    [`${tableOtherRow} &`]: {
      background: theme.themeColors.baseColors.gray5,
    },
    [`${tableRowHighLight} &`]: {
      background: theme.themeColors.baseColors.green10,
    },
  },
});
