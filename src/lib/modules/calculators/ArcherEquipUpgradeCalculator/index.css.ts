import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[6],
});

export const innerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.space[2],
});

export const ascensionLevelContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.space[2],
  flexWrap: 'wrap',
});

export const ascensionLevel = style({
  display: 'flex',
  gap: 0,
});

export const result = style({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  fontWeight: 600,
});

export const shardResult = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space[2],
});

export const ascensionStoneResult = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space[2],
});

export const icon = style({
  marginLeft: theme.space[2],
  maxWidth: theme.sizes[12],
});
