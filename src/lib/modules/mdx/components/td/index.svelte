<script lang="ts">
  import Text from '$lib/components/Text/index.svelte';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';

  export let align: Sprinkles['textAlign'] = 'left';
</script>

<td
  class={sprinkles({
    padding: 2,
  })}><Text textAlign={align}><slot /></Text></td
>
