<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';

  export let align: Sprinkles['textAlign'] = 'left';
</script>

<th
  class={concatClasses(
    styles.th,
    sprinkles({
      padding: 2,
    })
  )}><Heading as="h1" textAlign={align} fontSize="xl"><slot /></Heading></th
>
