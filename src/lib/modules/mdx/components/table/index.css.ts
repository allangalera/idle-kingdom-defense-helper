import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const table = style({
  borderCollapse: 'separate',
  borderColor: theme.themeColors.border.default,
  borderWidth: theme.sizes.px,
  borderStyle: 'solid',
  borderRadius: theme.border.radii.lg,
});
