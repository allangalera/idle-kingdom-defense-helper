import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const table = style({
  display: 'grid',
  gridTemplateColumns: 'repeat( auto-fill, minmax(237px, 1fr) )',
  gap: theme.space[2],
});

export const tableMinimal = style({
  gridTemplateColumns: 'repeat( auto-fill, minmax(310px, 1fr) )',
});

export const tableDetailed = style({
  gridTemplateColumns: 'repeat( auto-fill, minmax(320px, 1fr) )',
});

export const tableVariant = styleVariants({
  default: [table],
  minimal: [table, tableMinimal],
  detailed: [table, tableDetailed],
});
