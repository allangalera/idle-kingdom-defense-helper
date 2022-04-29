import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  height: '100vh',
  display: 'grid',
  gridTemplateAreas: '"header header" "main main"',
  gridTemplateColumns: 'auto',
  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridTemplateAreas: '"header header" "menu main"',
      gridTemplateColumns: theme.sizes.max,
    },
  },
});
