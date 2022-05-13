import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

export const img = style({
  objectFit: 'cover',
  minWidth: '100%',
  minHeight: '100%',
});
