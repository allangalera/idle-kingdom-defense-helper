<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';

  import * as styles from './index.css';

  export let as: 'p' | 'span' = 'p';
  export let fontSize: Sprinkles['fontSize'] = 'base';
  export let fontWeight: Sprinkles['fontWeight'] = 'normal';
  export let color: Sprinkles['color'] = 'gray12';
  export let textAlign: Sprinkles['textAlign'] = 'left';
  export let fontFamily: Sprinkles['fontFamily'] = 'heading';

  let className = [
    styles.paragraph,
    sprinkles({
      color: color,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontFamily: fontFamily,
      textAlign: textAlign,
    }),
  ].join(' ');
</script>

{#if as === 'p'}
  <p class={className}>
    <slot />
  </p>
{:else if as === 'span'}
  <span class={className}>
    <slot />
  </span>
{/if}
