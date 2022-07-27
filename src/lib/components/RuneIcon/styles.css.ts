import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
});

export const enchantLevel = style({
  position: 'absolute',
  top: 0,
  right: theme.sizes['0.5'],
});
