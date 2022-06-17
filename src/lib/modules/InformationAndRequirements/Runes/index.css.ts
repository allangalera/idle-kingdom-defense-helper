import { sprinkles } from '$lib/styles/sprinkles.css';
import * as tableStyles from '$lib/styles/table.css';
import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';

export const tableSpacing = style({
  paddingRight: theme.space[2],
  paddingLeft: theme.space[2],
});

export const doubleColumn = style({
  gridColumn: 'span 2',
});

export const tableHeader = style([
  tableStyles.tableHeaderItem,
  sprinkles({
    paddingX: 4,
    background: 'gray1',
  }),
]);

export const aLotOfColumns = style({
  gridColumn: 'span 26',
});

export const tripleRow = style({
  gridRow: 'span 3',
});

export const stickyLeft = style({
  position: 'sticky',
  left: 0,
});

export const minWidthMaxContent = style({
  minWidth: theme.sizes.max,
});
