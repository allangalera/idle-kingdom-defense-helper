import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const container = style({
  overflowX: 'auto',
  maxWidth: '100%',
});

export const gridContainer = style({
  display: 'grid',
  gridTemplateColumns: `repeat(30, ${theme.sizes[20]})`,
  gridTemplateRows: `min-content auto auto auto`,
});

export const gradeHeader = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.space[2],
  paddingBottom: theme.space[2],
  borderBottomWidth: theme.sizes.px,
  borderBottomStyle: 'solid',
  borderBottomColor: theme.themeColors.border.default,
});

export const runeContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.space[2],
  paddingBottom: theme.space[2],
  zIndex: 1,
  position: 'relative',
});

export const rune = style({});

export const disabledRune = style({
  filter: 'grayscale(70%)',
});

export const runeVariant = styleVariants({
  default: [rune],
  disabled: [rune, disabledRune],
});

export const dependencyRuneCounterContainer = style({
  position: 'absolute',
  textShadow: '0px 0px 5px #000',
  pointerEvents: 'none',
  top: calc.negate(theme.space[1]),
  background: theme.themeColors.baseColors.gray3,
  borderStyle: 'solid',
  borderWidth: theme.sizes.px,
  borderColor: theme.themeColors.border.default,
  borderRadius: theme.border.radii.full,
  paddingLeft: theme.sizes[2],
  paddingRight: theme.sizes[2],
});

export const start = style({
  width: theme.sizes[3],
  height: theme.sizes[3],
});

export const lineContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const line = style({
  zIndex: 0,
  width: '80%',
  height: theme.sizes[1],
  background: theme.themeColors.baseColors.green10,
  opacity: 0.2,
});

export const lineAvailable = style({
  opacity: 1,
});

export const lineVariant = styleVariants({
  default: [line],
  available: [line, lineAvailable],
});
