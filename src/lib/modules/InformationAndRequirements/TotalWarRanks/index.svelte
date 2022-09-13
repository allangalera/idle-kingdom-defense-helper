<script lang="ts">
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { totalwarRanks } from '$lib/db/total-war';
  import * as tableStyles from '$lib/styles/table.css';
  import { getRowStyling } from '$lib/styles/utils';
</script>

<GridItem title="Total War: Ranks">
  <div class={tableStyles.table7Columns}>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Rank</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Name</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Artifact Inventory</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Recovery</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Victory Rewards</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Required Stage</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Required Victories</Heading>
    </div>
    {#each totalwarRanks as item, row}
      <div class={tableStyles.tableRowVariant[getRowStyling(row)]}>
        <div class={tableStyles.tableItem}>
          <Text>{item.rank}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text>{item.name}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text>{item.inventorySize}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text>{item.recoveryLimit}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text>{item.rewardBox}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text>{totalwarRanks[row - 1]?.upgradeStageLv ?? '-'}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text>{totalwarRanks[row - 1]?.upgradeWinning ?? '-'}</Text>
        </div>
      </div>
    {/each}
  </div>
</GridItem>
