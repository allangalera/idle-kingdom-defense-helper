import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[8],
  marginTop: theme.space[8],
});

export const formContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
  '@media': {
    'screen and (min-width: 1024px)': {
      flexDirection: 'row',
    },
  },
});

export const configurations = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.space[4],
  flexDirection: 'column',
  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row',
    },
  },
});

export const input = style({
  display: 'flex',
});

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
});

export const inputContainer = style({
  display: 'flex',
  gap: theme.space[2],
});

export const tierHeaderImage = style({
  maxWidth: '100%',
});
export const heroesContainer = style({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space[8],
});

export const tableContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.sizes[8],
});

export const table = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.sizes[2],
});
