import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  overflowX: 'auto',
  maxWidth: '100%',
});

export const gridContainer = style({
  display: 'grid',
  gridTemplateColumns: `repeat(30, ${theme.sizes[20]})`,
  gridTemplateRows: `min-content auto auto auto`,
});

export const gradeHeader = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.space[2],
  paddingBottom: theme.space[2],
  borderBottomWidth: theme.sizes.px,
  borderBottomStyle: 'solid',
  borderBottomColor: theme.themeColors.border.default,
});

export const runeContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.space[2],
  paddingBottom: theme.space[2],
});

export const start = style({
  width: theme.sizes[3],
  height: theme.sizes[3],
});
