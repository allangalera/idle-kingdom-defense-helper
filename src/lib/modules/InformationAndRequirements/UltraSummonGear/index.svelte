<script lang="ts">
  import GradeStars from '$lib/components/GradeStars/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { ultraSummonStageUnlockGrades } from '$lib/db/summon';
  import { stage } from '$lib/shared/stores/user/stage';
  import * as tableStyles from '$lib/styles/table.css';
  import { getRowStyling } from '$lib/styles/utils';

  const getHighlightedStages = (userCurrentStage) => {
    let highlightedLevel = null;
    for (const step of Object.keys(ultraSummonStageUnlockGrades)) {
      if (userCurrentStage > ultraSummonStageUnlockGrades[step].stage) {
        highlightedLevel = step;
      }
    }
    return highlightedLevel;
  };

  $: highlightedLv = getHighlightedStages($stage.stage);
</script>

<GridItem title="Ultra Summon Gear: Stage Unlocked">
  <div class={tableStyles.table3Columns}>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Step</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Highest Grade</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
    </div>
    {#each Object.keys(ultraSummonStageUnlockGrades) as item, row}
      <div class={tableStyles.tableRowVariant[getRowStyling(row, highlightedLv === item)]}>
        <div class={tableStyles.tableItem}>
          <Text>{item}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <GradeStars grade={ultraSummonStageUnlockGrades[item].grade} size={4} />
        </div>
        <div class={tableStyles.tableItem}>
          <Text>{ultraSummonStageUnlockGrades[item].stage}</Text>
        </div>
      </div>
    {/each}
  </div>
</GridItem>
