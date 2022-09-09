import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const menu = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
  flex: 1,
  overflow: 'auto',
});
