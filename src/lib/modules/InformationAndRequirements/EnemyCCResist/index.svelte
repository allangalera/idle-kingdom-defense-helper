<script lang="ts">
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { enemyCCResist } from '$lib/db/stage';
  import { stage } from '$lib/shared/stores/user/stage';
  import * as tableStyles from '$lib/styles/table.css';
  import { getRowStyling } from '$lib/styles/utils';

  const getHighlightedStages = (userCurrentStage) => {
    let highlightedLevel = null;
    for (const cStage of Object.keys(enemyCCResist)) {
      if (userCurrentStage > enemyCCResist[cStage]) {
        highlightedLevel = cStage;
      }
    }
    return highlightedLevel;
  };

  $: highlightedLv = getHighlightedStages($stage.stage);
</script>

<GridItem title="Enemy CC Resist">
  <div class={tableStyles.table2Columns}>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">CC Resist</Heading>
    </div>
    {#each Object.keys(enemyCCResist) as item, row}
      <div class={tableStyles.tableRowVariant[getRowStyling(row, highlightedLv === item)]}>
        <div class={tableStyles.tableItem}>
          <Text>{enemyCCResist[item]}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{item}%</Text>
        </div>
      </div>
    {/each}
  </div>
</GridItem>
