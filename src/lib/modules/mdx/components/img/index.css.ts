import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const img = style({
  maxWidth: theme.sizes.full,
});

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
