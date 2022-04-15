import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const input = style({
  visibility: 'hidden',
  display: 'none',
});

export const container = style({
  display: 'flex',
  opacity: 0.3,
  padding: theme.space[0.5],
  ':focus': {
    boxShadow: `0 0 0 3px ${theme.themeColors.accent.base}`,
  },
});

export const containerVariant = styleVariants({
  notchecked: [container],
  checked: [
    container,
    {
      opacity: 1,
    },
  ],
});

export const ball = style({
  display: 'block',
  width: theme.sizes[5],
  aspectRatio: '1 / 1',
  height: 'auto',
  background: theme.baseColor.white,
  borderRadius: theme.border.radii.full,
  transition: '130ms linear',
  justifySelf: 'flex-end',
});

export const ballVariant = styleVariants({
  left: [ball],
  right: [
    ball,
    {
      transform: 'translateX(68%)',
    },
  ],
});
