<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { ArcherGearEquip } from '$lib/enums';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';
  import { capitalCase } from 'change-case';

  import * as styles from './index.css';

  export let value;

  const onSelect = (tier) => {
    value = tier;
  };
</script>

<div class={styles.rarityContainer}>
  {#each Object.keys(ArcherGearEquip) as equip}
    <Button variant="logic" on:click={() => onSelect(equip)}>
      <div
        class={concatClasses(
          styles.container,
          sprinkles({
            opacity: value === equip ? 1 : 0.5,
            paddingY: 2,
            paddingX: 4,
          })
        )}
      >
        <Text>{capitalCase(equip)}</Text>
      </div>
    </Button>
  {/each}
</div>
