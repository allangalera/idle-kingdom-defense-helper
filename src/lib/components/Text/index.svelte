<script lang="ts">
  import * as styles from './index.css';
  import { sprinkles, type Sprinkles } from '$lib/styles/sprinkles.css';
  export let as: 'p' | 'span' = 'p';
  export let fontSize: Sprinkles['fontSize'] = 'base';
  export let fontWeight: Sprinkles['fontWeight'] = 'normal';
  export let color: Sprinkles['color'] = 'gray12';
  export let textAlign: Sprinkles['textAlign'] = 'left';
  export let fontFamily: Sprinkles['fontFamily'] = 'body';

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
