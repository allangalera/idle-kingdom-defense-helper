import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  borderRadius: theme.border.radii.lg,
  borderWidth: theme.space.px,
  borderStyle: 'solid',
  borderColor: theme.themeColors.border.default,
  fontFamily: theme.font.family.body,
  fontSize: theme.font.fontSizes.lg,
  background: theme.themeColors.background.default,
  color: theme.themeColors.text.default,
  padding: theme.space[2],
});

export const option = style({
  background: theme.themeColors.background.default,
  fontFamily: theme.font.family.body,
  fontSize: theme.font.fontSizes.lg,
});
