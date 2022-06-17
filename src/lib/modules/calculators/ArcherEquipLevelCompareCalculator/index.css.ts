import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[6],
});

export const equipContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space[2],
});

export const radioEquipContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const radioTierContainer = style({
  display: 'flex',
});

export const tierIcon = style({
  width: theme.sizes[6],
  height: 'auto',
});

export const innerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.space[2],
});
