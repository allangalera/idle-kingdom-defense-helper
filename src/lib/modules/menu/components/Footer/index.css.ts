import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const menuFooter = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
});

export const tokenInputContainer = style({
  display: 'flex',
  gap: theme.space[2],
  alignItems: 'flex-end',
});

export const tokenCopyIcon = style({
  width: theme.sizes[6],
  height: theme.sizes[6],
});
