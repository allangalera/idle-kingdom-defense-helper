import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const paragraph = style({
  wordBreak: 'break-word',
  margin: 0,
  '::selection': {
    background: theme.themeColors.accent.base,
    color: theme.baseColor.white,
  },
});
