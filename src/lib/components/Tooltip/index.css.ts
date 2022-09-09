import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'fixed',
  zIndex: 9900,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const tooltip = style({
  background: theme.themeColors.baseColors.gray3,
  padding: theme.space[2],
  borderRadius: theme.border.radii.lg,
  borderColor: theme.themeColors.baseColors.gray10,
  borderWidth: theme.border.width.base,
  borderStyle: 'solid',
});

export const triangle = style({
  position: 'absolute',
  width: 0,
  height: 0,
  borderLeftColor: theme.colors.transparent,
  borderRightColor: theme.colors.transparent,
  borderTopColor: theme.themeColors.baseColors.gray10,
  borderLeftStyle: 'solid',
  borderRightStyle: 'solid',
  borderTopStyle: 'solid',
  borderLeftWidth: theme.space[2],
  borderRightWidth: theme.space[2],
  borderTopWidth: theme.space[3],
});
