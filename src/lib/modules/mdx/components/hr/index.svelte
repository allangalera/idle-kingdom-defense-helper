<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
</script>

<div
  class={sprinkles({
    width: 'full',
    height: 'px',
    background: 'gray12',
    marginY: 4,
  })}
>
  <slot />
</div>
