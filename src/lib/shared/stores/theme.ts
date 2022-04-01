import { browser } from '$app/env';
import { writable } from 'svelte/store';

export enum ThemeOptions {
  light = 'light',
  dark = 'dark',
}

export type ThemeParameter = {
  theme: ThemeOptions;
  isForced: boolean;
};

const isThemeOptions = (value): value is ThemeOptions => {
  return value === ThemeOptions.dark || value === ThemeOptions.light;
};

const getInitialTheme = () => {
  const localStorageTheme = browser && window.localStorage.getItem('theme');
  if (browser && isThemeOptions(localStorageTheme)) {
    return {
      theme: localStorageTheme,
      isForced: true,
    };
  }

  return {
    theme: ThemeOptions.light,
    isForced: false,
  };
};

export const theme = writable<ThemeParameter>(getInitialTheme());

theme.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('theme', value.theme);
  }
});
