import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  borderWidth: theme.space.px,
  borderStyle: 'solid',
  borderColor: theme.themeColors.border.default,
  borderRadius: theme.border.radii.lg,
});

export const containerVariant = styleVariants({
  default: [container],
  full: [
    container,
    {
      '@media': {
        'screen and (min-width: 768px)': {
          gridColumn: '1 / span 2',
        },
      },
    },
  ],
});

export const title = style({
  padding: theme.space[2],
  borderWidth: 0,
  borderBottomWidth: theme.space.px,
  borderColor: theme.themeColors.border.default,
  borderStyle: 'solid',
  fontSize: theme.font.fontSizes['2xl'],
});

export const content = style({
  padding: theme.space[2],
});
