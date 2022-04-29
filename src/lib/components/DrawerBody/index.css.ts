import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const container = style({
  background: theme.themeColors.baseColors.gray1,
  minWidth: theme.sizes[60],
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  padding: theme.space[4],
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const headerContainer = style({
  flex: 1,
  paddingRight: calc(theme.space[4]).add(theme.sizes[6]).toString(),
  paddingLeft: calc(theme.space[4]).add(theme.sizes[6]).toString(),
});

export const headerCloseIconContainer = style({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: theme.space[4],
});

export const headerCloseIcon = style({
  width: theme.sizes[6],
  height: theme.sizes[6],
  cursor: 'pointer',
});

export const content = style({
  padding: theme.space[4],
  flex: 1,
});
export const footer = style({
  padding: theme.space[4],
  display: 'flex',
  gap: theme.space[2],
});
