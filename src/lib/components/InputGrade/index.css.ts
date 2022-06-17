import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({});

export const starIcon = style({});

export const imageVariant = styleVariants({
  default: [starIcon, {}],
  disabled: [
    starIcon,
    {
      opacity: 0.15,
    },
  ],
});

export const button = style({
  cursor: 'pointer',
});

export const rarityContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const levelContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.space[2],
});
