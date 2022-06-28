import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const tr = style({
  selectors: {
    '&:nth-child(even)': {
      background: theme.themeColors.baseColors.gray5,
    },
  },
});
