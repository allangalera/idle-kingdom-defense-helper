import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'max-content',
  margin: '0 auto',
  rowGap: theme.space[1],
});

export const centerFlex = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const kingdomName = style({
  borderStyle: 'solid',
  borderWidth: theme.sizes.px,
  borderRadius: theme.border.radii.lg,
  padding: theme.space[1],
  paddingLeft: theme.space[0.5],
  paddingRight: theme.space[0.5],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ascensionIcon = style({
  width: theme.sizes[6],
});

export const buttonIcon = style({
  width: theme.sizes[4],
  height: theme.sizes[4],
});

export const input = style({
  display: 'flex',
});

export const sortContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space[4],
  marginBottom: theme.space[12],
});

export const rewardsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space[8],
  marginBottom: theme.space[12],
});

export const rewardsTable = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.space[4],
});

export const rewardsValues = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space[2],
});
