import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const grid = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  paddingTop: theme.space[16],
  gap: theme.space[8],
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});

export const table = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  justifyContent: 'center',
  alignItems: 'center',
  selectors: {
    '&:nth-child(4n+1)': {
      background: theme.themeColors.baseColors.gray1,
    },
  },
});

export const table3Columns = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  justifyContent: 'center',
  alignItems: 'center',
  selectors: {
    '&:nth-child(4n+1)': {
      background: theme.themeColors.baseColors.gray1,
    },
  },
});
export const table4Columns = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  justifyContent: 'center',
  alignItems: 'center',
  selectors: {
    '&:nth-child(4n+1)': {
      background: theme.themeColors.baseColors.gray1,
    },
  },
});
export const table6Columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
});

export const propertyIcons = style({
  maxWidth: theme.sizes.full,
  maxHeight: theme.sizes.full,
});

export const archerDropRateTable = style([
  table6Columns,
  {
    gridAutoRows: theme.sizes[10],
  },
]);

export const center = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const tableItem = style([
  center,
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStyle: 'solid',
    borderTopWidth: theme.sizes.px,
    borderTopColor: theme.themeColors.baseColors.gray7,
    padding: theme.space[0.5],
    height: theme.sizes.full,
  },
]);
