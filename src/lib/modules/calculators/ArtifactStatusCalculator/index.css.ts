import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: theme.space[2],
  flexDirection: 'column',
  alignItems: 'center',
});

export const result = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[2],
  justifyContent: 'center',
  alignItems: 'center',
});

export const icon = style({
  marginLeft: theme.space[2],
  maxWidth: theme.sizes[12],
});

export const abilityContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.space[2],
});
