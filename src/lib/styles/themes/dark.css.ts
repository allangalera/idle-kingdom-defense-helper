import {
  grayDark,
  redDark,
  greenDark,
  yellowDark,
  blueDark,
  plumDark,
  amberDark,
  orangeDark,
  brownDark,
  grayDarkA,
} from '@radix-ui/colors';
import { createTheme } from '@vanilla-extract/css';

import { themeColors } from './index.css';

export const darkTheme = createTheme(themeColors, {
  baseColors: {
    ...grayDark,
    ...grayDarkA,
    ...redDark,
    ...greenDark,
    ...yellowDark,
    ...blueDark,
    ...plumDark,
    ...amberDark,
    ...orangeDark,
    ...brownDark,
  },
  text: {
    default: '#ffffff',
    contrast: '#151515',
  },
  background: {
    default: '#0D0D0D',
    contrast: '#c2c2c2',
  },
  header: {
    default: '#0D0D0D',
  },
  border: {
    default: grayDark.gray7,
    hover: grayDark.gray9,
  },
  accent: {
    base: '#783cb7',
    transparency: ' #783cb728',
  },
  secondary: {
    base: '#48dc81',
  },
});
