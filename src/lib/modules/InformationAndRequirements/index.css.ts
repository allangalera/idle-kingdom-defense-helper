import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const grid = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  paddingTop: theme.space[16],
  gap: theme.space[8],
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});
