import { table6Columns } from '$lib/styles/table.css';
import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const archerDropRateTable = style([
  table6Columns,
  {
    gridAutoRows: theme.sizes[10],
  },
]);

export const propertyIcons = style({
  maxWidth: theme.sizes.full,
  maxHeight: theme.sizes.full,
});
