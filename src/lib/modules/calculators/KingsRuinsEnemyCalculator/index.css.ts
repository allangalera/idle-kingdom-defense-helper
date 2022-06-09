import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
});

export const resultsContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
  gap: theme.space[4],
  width: theme.sizes.full,
});

export const flex = style({
  display: 'flex',
  gap: theme.space[1],
  flexWrap: 'wrap',
  borderWidth: theme.sizes.px,
  borderStyle: 'solid',
  borderColor: theme.themeColors.border.default,
  borderRadius: theme.border.radii.lg,
  padding: theme.space[2],
  justifyContent: 'center',
  alignItems: 'center',
});

export const icon = style({
  width: theme.sizes[6],
  height: 'auto',
  verticalAlign: 'middle',
});
