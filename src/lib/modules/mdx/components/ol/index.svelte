<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
</script>

<ol
  class={sprinkles({
    color: 'gray12',
    fontFamily: 'body',
    fontSize: 'base',
    lineHeight: 'tall',
  })}
>
  <slot />
</ol>
