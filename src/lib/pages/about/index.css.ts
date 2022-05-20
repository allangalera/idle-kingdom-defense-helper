import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: `${theme.sizes.md}`,
  margin: `${theme.space[10]} auto 0`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[12],
});
