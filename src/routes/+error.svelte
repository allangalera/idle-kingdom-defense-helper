<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
</script>

<div
  class={sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'full',
    flex: 1,
  })}
>
  <Heading textAlign="center" fontSize="7xl">404</Heading>
  <Text textAlign="center">Nothing to find here</Text>
</div>
