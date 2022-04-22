<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';

  import * as styles from './index.css';

  export let type = 'click';
  export let disabled = false;
  export let variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';

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
  } as const;
</script>

<button
  class={[
    styles.container,
    sprinkles({
      background: disabled ? backgroundDisabledColors[variant] : backgroundColors[variant],
      borderColor: disabled ? borderDisabledColors[variant] : borderColors[variant],
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }),
  ].join(' ')}
  {type}
  {disabled}
  on:click
>
  <slot />
</button>
