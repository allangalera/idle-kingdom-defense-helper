import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const grid = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[8],
  maxWidth: theme.sizes.full,
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
  },
});
