import { style } from '@vanilla-extract/css';
import { theme } from '$lib/styles/themes/index.css';

export const container = style({
  width: '100%',
  margin: '0 auto',
  maxWidth: theme.breakpoints.xl,
  flex: 1,
});
