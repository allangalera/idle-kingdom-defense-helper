import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { darkTheme } from './themes/dark.css';
import { theme, breakpoints, sizings } from './themes/index.css';

const responsiveProperties = defineProperties({
  conditions: {
    [sizings.sm]: {},
    [sizings.md]: { '@media': `screen and (min-width: ${breakpoints.md})` },
    [sizings.lg]: { '@media': `screen and (min-width: ${breakpoints.lg})` },
    [sizings.xl]: { '@media': `screen and (min-width: ${breakpoints.xl})` },
    [sizings['2xl']]: { '@media': `screen and (min-width: ${breakpoints['2xl']})` },
  },
  defaultCondition: 'sm',
  properties: {
    display: ['none', 'flex', 'block', 'inline'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    width: theme.sizes,
    maxWidth: theme.sizes,
    height: theme.sizes,
    maxHeight: theme.sizes,
    gap: theme.space,
    paddingTop: theme.space,
    paddingBottom: theme.space,
    paddingLeft: theme.space,
    paddingRight: theme.space,
    borderWidth: theme.space,
    fontSize: theme.font.fontSizes,
    fontWeight: theme.font.fontWeights,
    lineHeight: theme.font.lineHeights,
    fontFamily: theme.font.family,
    letterSpacing: theme.font.letterSpacings,
    textAlign: ['left', 'center', 'right', 'start', 'end'],
    cursor: ['pointer', 'not-allowed'],
    opacity: [0, 0.5, 1],
    flex: [0, 1],
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingBottom', 'paddingTop'],
    placeItems: ['justifyContent', 'alignItems'],
    size: ['width', 'height'],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { selector: `.${darkTheme} &` },
  },
  defaultCondition: 'lightMode',
  properties: {
    background: { ...theme.themeColors.baseColors, ...theme.colors },
    color: { ...theme.themeColors.baseColors, ...theme.colors },
    borderColor: { ...theme.themeColors.baseColors, ...theme.colors },
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
