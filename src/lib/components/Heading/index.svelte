<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';

  export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
  export let fontSize: Sprinkles['fontSize'] = 'lg';
  export let fontWeight: Sprinkles['fontWeight'] = 'normal';
  export let textAlign: Sprinkles['textAlign'] = 'left';
  export let marginBottom: Sprinkles['marginBottom'] = 'none';
  export let marginTop: Sprinkles['marginTop'] = 'none';
</script>

<svelte:element
  this={as}
  class={concatClasses(
    styles.heading,
    sprinkles({
      fontSize: fontSize,
      fontWeight: fontWeight,
      textAlign: textAlign,
      color: 'gray12',
      marginBottom,
      marginTop,
    })
  )}
>
  <slot />
</svelte:element>
