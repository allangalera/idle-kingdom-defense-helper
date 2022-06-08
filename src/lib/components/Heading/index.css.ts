import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const heading = style({
  fontFamily: theme.font.family.heading,
  '::selection': {
    background: theme.themeColors.accent.base,
    color: theme.baseColor.white,
  },
});
