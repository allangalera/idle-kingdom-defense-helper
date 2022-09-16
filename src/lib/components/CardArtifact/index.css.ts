import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  position: 'relative',
  height: '100%',
  width: '100%',
});

export const img = style({
  maxWidth: '100%',
  maxHeight: '100%',
});
