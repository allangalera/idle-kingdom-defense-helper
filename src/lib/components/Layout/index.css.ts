import { breakpoints, theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  height: '100vh',
  display: 'grid',
  gridTemplateAreas: '"header header" "main main"',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: 'auto',
  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridTemplateAreas: '"header header" "menu main"',
      gridTemplateColumns: theme.sizes.max,
    },
  },
});

export const dataToBeSavedContainer = style({
  position: 'fixed',
  bottom: theme.space[4],
  right: 'unset',
  left: theme.space[4],
  padding: theme.space[2],
  marginBottom: theme.space[4],
  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      left: 'unset',
      right: theme.space[8],
    },
  },
  background: theme.themeColors.baseColors.gray3,
  borderStyle: 'solid',
  borderRadius: theme.border.radii.base,
  borderWidth: theme.sizes.px,
  borderColor: theme.themeColors.baseColors.gray10,
});
