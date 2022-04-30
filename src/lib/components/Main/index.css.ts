import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  gridArea: 'main',
});

export const wrapper = style({
  width: '100%',
  maxWidth: theme.breakpoints['2xl'],
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const mainContentContainer = style({
  flex: 1,
});
