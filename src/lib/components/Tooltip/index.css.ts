import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'fixed',
  zIndex: 1200,
  transform: 'translate(-50%, -100%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: theme.sizes.full,
});

export const tooltip = style({
  background: theme.themeColors.baseColors.gray7,
  padding: theme.space[2],
  borderRadius: theme.border.radii.lg,
});

export const triangle = style({
  width: 0,
  height: 0,
  borderLeftColor: theme.colors.transparent,
  borderRightColor: theme.colors.transparent,
  borderTopColor: theme.themeColors.baseColors.gray7,
  borderLeftStyle: 'solid',
  borderRightStyle: 'solid',
  borderTopStyle: 'solid',
  borderLeftWidth: theme.space[2],
  borderRightWidth: theme.space[2],
  borderTopWidth: theme.space[3],
});
