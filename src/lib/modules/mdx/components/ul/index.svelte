<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
</script>

<ul
  class={sprinkles({
    color: 'gray12',
    fontFamily: 'body',
    fontSize: 'base',
    lineHeight: 'tall',
  })}
>
  <slot />
</ul>
