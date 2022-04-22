import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const table = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: theme.sizes[2],
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [`screen and (min-width: ${breakpoints['2xl']})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
});
