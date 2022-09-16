import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const grid = style({
  width: '100%',
  maxWidth: theme.sizes.full,
  display: 'grid',
  gap: theme.space[8],
  gridTemplateColumns: '1fr',
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});
