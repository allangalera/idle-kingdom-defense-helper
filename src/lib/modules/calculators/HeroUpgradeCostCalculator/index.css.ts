import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gap: theme.space[2],
  flexWrap: 'wrap',
  gridTemplateColumns: '1fr 1fr 1fr',
  alignItems: 'flex-end',
});

export const result = style({
  gridColumn: '1 / span 3',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  fontWeight: 600,
});

export const goldResult = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
export const soulResult = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const icon = style({
  marginLeft: theme.space[2],
  maxWidth: theme.sizes[12],
});
