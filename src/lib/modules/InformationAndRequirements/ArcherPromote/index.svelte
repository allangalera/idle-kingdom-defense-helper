<script lang="ts">
  import GradeStars from '$lib/components/GradeStars/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { archerPromoteStageRequirements, craft } from '$lib/db/archer';
  import { stage } from '$lib/shared/stores/user/stage';
  import * as tableStyles from '$lib/styles/table.css';
  import { getRowStyling } from '$lib/styles/utils';

  const getHighlightedStages = (userCurrentStage) => {
    let highlightedLevel = null;
    for (const step of Object.keys(archerPromoteStageRequirements)) {
      if (userCurrentStage > archerPromoteStageRequirements[step]) {
        highlightedLevel = step;
      }
    }
    return highlightedLevel;
  };

  $: highlightedLv = getHighlightedStages($stage.stage);
</script>

<GridItem title="Archer Promote: Stage Unlocked">
  <div class={tableStyles.table2Columns}>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Grade</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
    </div>
    {#each Object.keys(archerPromoteStageRequirements) as item, row}
      <div class={tableStyles.tableRowVariant[getRowStyling(row, highlightedLv === item)]}>
        <div class={tableStyles.tableItem}>
          <GradeStars grade={+item} size={4} />
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{archerPromoteStageRequirements[item]}</Text>
        </div>
      </div>
    {/each}
  </div>
</GridItem>
