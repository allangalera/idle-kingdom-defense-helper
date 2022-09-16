import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
});

export const gradeContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.space[2],
  alignItems: 'center',
});

export const icons = style({
  width: theme.sizes[6],
  height: theme.sizes[6],
  cursor: 'pointer',
});

export const abilityContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.space[2],
});
