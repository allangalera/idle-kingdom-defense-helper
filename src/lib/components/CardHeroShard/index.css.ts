import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const background = style({
  maxWidth: '100%',
  maxHeight: '100%',
});
export const iconShard = style({
  position: 'absolute',
  top: '50%',
  left: theme.space[1],
  transform: 'translateY(-50%)',
  maxWidth: '100%',
  maxHeight: '100%',
});

export const question = style({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  // opacity: 0.5,
  justifyContent: 'center',
  alignItems: 'center',
});

export const counter = style({
  position: 'absolute',
  top: 0,
  width: '100%',
  right: theme.space[0.5],
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  textShadow: '1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
});
