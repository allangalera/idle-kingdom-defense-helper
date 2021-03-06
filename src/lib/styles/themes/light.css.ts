import {
  amber,
  blue,
  brown,
  gray,
  grayA,
  green,
  orange,
  plum,
  purple,
  purpleA,
  red,
  yellow,
} from '@radix-ui/colors';
import { createTheme } from '@vanilla-extract/css';

import { themeColors } from './index.css';

export const lightTheme = createTheme(themeColors, {
  baseColors: {
    ...gray,
    ...grayA,
    ...red,
    ...green,
    ...yellow,
    ...blue,
    ...plum,
    ...amber,
    ...orange,
    ...brown,
    ...purple,
  },
  text: {
    default: '#1b1b1b',
    contrast: '#ffffff',
  },
  background: {
    default: '#E6E6E6',
    contrast: '#0b0b0b',
  },
  header: {
    default: '#E6E6E6',
  },
  border: {
    default: gray.gray7,
    hover: gray.gray9,
  },
  accent: {
    base: purple.purple9,
    transparency: purpleA.purpleA9,
  },
  secondary: {
    base: '#48dc81',
  },
});
