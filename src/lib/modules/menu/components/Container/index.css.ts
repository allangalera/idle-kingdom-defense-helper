import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'sticky',
  maxHeight: '100vh',
  gridArea: 'menu',
  width: theme.sizes.max,
});
