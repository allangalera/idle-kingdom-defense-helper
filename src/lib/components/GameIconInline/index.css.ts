import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const img = style({
  width: theme.sizes[7],
  height: 'auto',
  verticalAlign: 'middle',
});
