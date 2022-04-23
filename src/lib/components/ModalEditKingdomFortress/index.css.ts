import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const fortressContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[3],
  paddingTop: theme.space[4],
});
