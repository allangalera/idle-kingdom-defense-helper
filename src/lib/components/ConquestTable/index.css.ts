import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, max-content)',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'max-content',
  margin: '0 auto',
  rowGap: theme.space[1],
  columnGap: theme.space[3],
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
    },
  },
});

export const centerFlex = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const kingdomName = style({
  borderStyle: 'solid',
  borderWidth: theme.sizes.px,
  borderRadius: theme.border.radii.lg,
  padding: theme.space[1],
  paddingLeft: theme.space[0.5],
  paddingRight: theme.space[0.5],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const rewardsIcon = style({
  width: theme.sizes[4],
  height: 'auto',
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      width: theme.sizes[6],
    },
  },
});

export const ascensionIcon = style({
  width: theme.sizes[6],
  height: 'auto',
});

export const buttonIcon = style({
  width: theme.sizes[4],
  height: theme.sizes[4],
});

export const input = style({
  display: 'flex',
});

export const sortContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space[4],
  marginBottom: theme.space[12],
});

export const rewardsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space[4],
  marginBottom: theme.space[12],
});

export const rewardsTable = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.space[2],
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gap: theme.space[4],
    },
  },
});

export const rewardsValues = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space[2],
});
