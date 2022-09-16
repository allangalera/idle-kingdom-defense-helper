import {
  amberDark,
  blueDark,
  brownDark,
  gray,
  grayDark,
  grayDarkA,
  greenDark,
  orangeDark,
  plumDark,
  purpleDark,
  purpleDarkA,
  redDark,
  yellowDark,
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
    ...purpleDark,
  },
  text: {
    default: grayDark.gray12,
    contrast: '#151515',
  },
  background: {
    default: grayDark.gray1,
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
    base: purpleDark.purple9,
    transparency: purpleDarkA.purpleA9,
  },
  secondary: {
    base: '#48dc81',
  },
});
