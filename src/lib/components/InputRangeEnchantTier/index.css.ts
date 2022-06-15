import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const input = style({
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  borderRadius: theme.border.radii.lg,
  background: theme.themeColors.baseColors.gray4,
  cursor: 'pointer',
  borderWidth: theme.sizes.px,
  borderStyle: 'solid',
  borderColor: theme.themeColors.border.default,
  width: theme.sizes.full,
  height: theme.sizes[2],
  backgroundImage: `linear-gradient(${theme.themeColors.accent.base}, ${theme.themeColors.accent.base})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  '::-webkit-slider-thumb': {
    MozAppearance: 'none',
    appearance: 'none',
    backgroundColor: theme.themeColors.accent.base,
    borderRadius: theme.border.radii.full,
    height: theme.sizes[8],
    width: theme.sizes[1],
    border: 'none',
    marginTop: calc.negate(theme.space[3]),
  },
  '::-moz-range-thumb': {
    MozAppearance: 'none',
    background: theme.themeColors.accent.base,
    borderRadius: theme.border.radii.full,
    border: 'none',
    height: theme.sizes[8],
    width: theme.sizes[1],
  },
  // custom track
  '::-webkit-slider-runnable-track': {
    WebkitAppearance: 'none',
    background: 'transparent',
    color: theme.themeColors.accent.base,
    borderRadius: theme.border.radii.lg,
    height: theme.sizes[2],
  },
  '::-moz-range-progress': {
    background: theme.themeColors.accent.base,
    borderRadius: theme.border.radii.lg,
    height: theme.sizes[2],
  },
  ':focus': {
    boxShadow: `0 0 0 3px ${theme.themeColors.accent.base}`,
    outline: 'none',
  },
});
