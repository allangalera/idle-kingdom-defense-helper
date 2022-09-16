<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';

  export let value;
  export let options: { name: string; value: string | number }[];

  const onSelect = (tier) => {
    value = tier;
  };
</script>

<div class={styles.rarityContainer}>
  {#each options as item}
    <Button variant="logic" on:click={() => onSelect(item.value)}>
      <div
        class={concatClasses(
          styles.container,
          sprinkles({
            opacity: value === item.value ? 1 : 0.5,
            paddingY: 2,
            paddingX: 4,
          })
        )}
      >
        <Text>{item.name}</Text>
      </div>
    </Button>
  {/each}
</div>
