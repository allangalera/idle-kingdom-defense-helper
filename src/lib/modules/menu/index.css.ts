import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const buttoContainer = style({
  position: 'fixed',
  bottom: theme.space[4],
  right: theme.space[4],
  alignSelf: 'end',
  padding: theme.space[4],
  cursor: 'pointer',
  zIndex: 100,
});

export const menuIcon = style({
  width: theme.sizes[8],
  height: theme.sizes[8],
});
