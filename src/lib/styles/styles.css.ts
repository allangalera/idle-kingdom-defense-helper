import { globalStyle } from '@vanilla-extract/css';

import { theme } from './themes/index.css';

globalStyle('html, body', {
  minHeight: '100vh',
  margin: 0,
  width: '100%',
});

globalStyle('*, *::after, *::before', {
  boxSizing: 'border-box',
});

globalStyle('*::selection', {
  background: theme.themeColors.accent.base,
  color: theme.baseColor.white,
});
