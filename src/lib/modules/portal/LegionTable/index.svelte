<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import * as tableStyles from '$lib/styles/table.css';
  import { getRowStyling } from '$lib/styles/utils';
  import { returnItemStringIdById } from '$lib/utils/items';

  export let data;
  export let name;
</script>

<GridItem title={name}>
  <div class={tableStyles.table3Columns}>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Level</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Clear Reward</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Sweep Reward</Heading>
    </div>
    {#each data as level, row}
      <div class={tableStyles.tableRowVariant[getRowStyling(row)]}>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{level.lv}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          {#each level.clearReward as item}
            <Card cardType={returnItemStringIdById(item)} width={16} value={item.c} />
          {/each}
        </div>
        <div class={tableStyles.tableItem}>
          {#each level.reclearReward as item}
            <Card cardType={returnItemStringIdById(item)} width={16} value={item.c} />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</GridItem>
