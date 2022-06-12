import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const skillsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
});

export const skillContainer = style({
  display: 'flex',
  gap: theme.space[4],
});

export const skillIcon = style({
  width: theme.sizes[14],
  height: theme.sizes[14],
});

export const skillProgressionContainer = style({
  display: 'flex',
  gap: theme.space[1],
  width: theme.sizes.full,
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gap: theme.space[8],
    },
  },
});

export const skillProgression = style({
  flex: 1,
  lineHeight: 2,
  borderWidth: theme.sizes.px,
  borderStyle: 'solid',
  borderRadius: theme.border.radii.lg,
  position: 'relative',
  width: '100%',
});
