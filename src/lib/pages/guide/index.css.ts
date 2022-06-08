import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: theme.sizes['4xl'],
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[12],
});

export const section = style({});

export const liBefore = style({
  color: theme.themeColors.baseColors.gray12,
});

export const imageMaxWidth = style({
  maxWidth: theme.sizes.full,
});

export const imageAlignMiddle = style({
  verticalAlign: 'middle',
  width: theme.sizes[6],
  height: 'auto',
});
