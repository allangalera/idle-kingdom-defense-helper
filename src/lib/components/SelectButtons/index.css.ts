import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  borderRadius: theme.border.radii.lg,
  borderWidth: theme.space.px,
  borderStyle: 'solid',
  borderColor: theme.themeColors.border.default,
});

export const rarityContainer = style({
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: theme.space[2],
  flexWrap: 'wrap',
});
