<script lang="ts">
  import GradeStars from '$lib/components/GradeStars/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { runesSummonStageUnlock } from '$lib/db/runes';
  import * as tableStyles from '$lib/styles/table.css';
  import { getRowStyling } from '$lib/styles/utils';
</script>

<GridItem title="Sanctuary Runes: Stage Unlocked">
  <div class={tableStyles.table4Columns}>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Step</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Highest Grade</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Exp</Heading>
    </div>
    {#each Object.keys(runesSummonStageUnlock) as item, row}
      <div class={tableStyles.tableRowVariant[getRowStyling(row)]}>
        <div class={tableStyles.tableItem}>
          <Text>{item}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <GradeStars grade={runesSummonStageUnlock[item].grade} size={4} />
        </div>
        <div class={tableStyles.tableItem}>
          <Text>{runesSummonStageUnlock[item].stage}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text>{runesSummonStageUnlock[item].exp}</Text>
        </div>
      </div>
    {/each}
  </div>
</GridItem>
