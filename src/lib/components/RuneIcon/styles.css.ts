import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const container = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const enchantLevel = style({
  position: 'absolute',
  top: calc.negate(theme.space[1]),
  right: calc.negate(theme.space[1]),
  background: theme.themeColors.baseColors.gray3,
  borderStyle: 'solid',
  borderWidth: theme.sizes.px,
  borderColor: theme.themeColors.border.default,
  borderRadius: theme.border.radii.full,
  width: theme.sizes[6],
  height: theme.sizes[6],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const progressBarContainer = style({
  position: 'absolute',
  width: '80%',
  height: theme.sizes[1],
  bottom: theme.sizes[1],
  background: theme.themeColors.baseColors.gray6,
  borderStyle: 'solid',
  borderWidth: theme.sizes.px,
  borderColor: theme.themeColors.border.default,
  borderRadius: theme.border.radii.sm,
});

export const progressBar = style({
  background: `linear-gradient(${theme.themeColors.baseColors.amber9}, ${theme.themeColors.baseColors.yellow9})`,
  height: theme.sizes.full,
});

export const tierContainer = style({
  position: 'absolute',
  top: calc.negate(theme.space[1]),
  left: calc.negate(theme.space[1]),
  background: theme.themeColors.baseColors.gray3,
  borderStyle: 'solid',
  borderWidth: theme.sizes.px,
  borderColor: theme.themeColors.border.default,
  borderRadius: theme.border.radii.full,
  width: theme.sizes[6],
  height: theme.sizes[6],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const tier = style({
  width: theme.sizes[4],
  height: 'auto',
});
