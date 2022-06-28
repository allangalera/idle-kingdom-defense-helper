import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const th = style({
  borderBottomColor: theme.themeColors.border.default,
  borderBottomStyle: 'solid',
  borderBottomWidth: theme.sizes.px,
});
