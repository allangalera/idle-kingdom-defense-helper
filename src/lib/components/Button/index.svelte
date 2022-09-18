<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';

  export let type = 'button';
  export let disabled = false;
  export let variant: 'primary' | 'secondary' | 'danger' | 'success' | 'logic' = 'primary';
  export let ref = null;
  export let width: Sprinkles['width'] = 'unset';

  const backgroundColors = {
    primary: {
      lightMode: 'gray9',
      darkMode: 'gray9',
    },
    secondary: 'transparent',
    danger: 'red9',
    success: {
      darkMode: 'green9',
      lightMode: 'green9',
    },
    logic: 'transparent',
  } as const;

  const backgroundDisabledColors = {
    primary: {
      lightMode: 'gray9',
      darkMode: 'gray7',
    },
    secondary: 'transparent',
    danger: {
      darkMode: 'red4',
      lightMode: 'red9',
    },
    success: {
      darkMode: 'green4',
      lightMode: 'green9',
    },
    logic: 'transparent',
  } as const;

  const borderColors = {
    primary: {
      lightMode: 'gray9',
      darkMode: 'gray7',
    },
    secondary: 'gray10',
    danger: 'red9',
    success: {
      darkMode: 'green9',
      lightMode: 'green9',
    },
    logic: 'transparent',
  } as const;
  const borderDisabledColors = {
    primary: {
      lightMode: 'gray9',
      darkMode: 'gray7',
    },
    secondary: 'gray10',
    danger: {
      darkMode: 'red4',
      lightMode: 'red9',
    },
    success: {
      darkMode: 'green4',
      lightMode: 'green9',
    },
    logic: 'transparent',
  } as const;
</script>

<button
  class={concatClasses(
    styles.container,
    sprinkles({
      background: disabled ? backgroundDisabledColors[variant] : backgroundColors[variant],
      borderColor: disabled ? borderDisabledColors[variant] : borderColors[variant],
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled && variant !== 'logic' ? 0.5 : 1,
      padding: variant === 'logic' ? 'none' : 2,
      width,
    })
  )}
  {type}
  {disabled}
  on:click
  bind:this={ref}
>
  <slot />
</button>
