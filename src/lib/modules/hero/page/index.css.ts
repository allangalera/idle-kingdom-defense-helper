import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: theme.space[8],
  flexDirection: 'column',
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      flexDirection: 'row',
    },
  },
});

export const actionBtns = style({
  display: 'flex',
  gap: theme.space[4],
});

export const cardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.space[4],
});

export const infoContainer = style({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.space[8],
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});
