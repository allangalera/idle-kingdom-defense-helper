<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';

  export let as: 'p' | 'span' = 'p';
  export let fontSize: Sprinkles['fontSize'] = 'base';
  export let fontWeight: Sprinkles['fontWeight'] = 'normal';
  export let color: Sprinkles['color'] = 'gray12';
  export let textAlign: Sprinkles['textAlign'] = 'left';
  export let fontFamily: Sprinkles['fontFamily'] = 'heading';
  export let marginBottom: Sprinkles['marginBottom'] = 'none';
  export let marginTop: Sprinkles['marginTop'] = 'none';
  export let lineHeight: Sprinkles['lineHeight'] = 'tall';
</script>

<svelte:element
  this={as}
  class={concatClasses(
    sprinkles({
      color,
      fontSize,
      fontWeight,
      fontFamily,
      textAlign,
      lineHeight,
      marginBottom,
      marginTop,
    }),
    styles.paragraph
  )}
>
  <slot />
</svelte:element>
