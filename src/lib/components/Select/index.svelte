<script lang="ts">
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';

  import * as styles from './index.css';

  export let label: string;
  export let value;
  export let options: { name: string; value: string | number }[];
  export let textAlign: Sprinkles['textAlign'] = 'left';
</script>

<label
  class={sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    textAlign,
  })}
>
  <Text>{label}</Text>
  <select class={styles.container} bind:value>
    {#each options as item}
      <option class={styles.option} value={item.value}>{item.name}</option>
    {/each}
  </select>
</label>
