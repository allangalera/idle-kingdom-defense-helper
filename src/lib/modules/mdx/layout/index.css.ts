import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: theme.sizes['4xl'],
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
});
