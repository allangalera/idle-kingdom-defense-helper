import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: theme.colors.blackA10,
  zIndex: 1100,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});
