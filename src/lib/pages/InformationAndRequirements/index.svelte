<script lang="ts">
  import GradeStars from '$lib/components/GradeStars/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { archerPromoteStageRequirements } from '$lib/db/archer';
  import { runesSummonStageUnlock } from '$lib/db/runes';
  import { designStageUnlock, enemyCCResist, heroGearStageUnlock } from '$lib/db/stage';
  import { ultraSummonStageUnlockGrades } from '$lib/db/summon';

  import * as styles from './index.css';
</script>

<Heading textAlign="center" fontSize="xl">Information and Requirements</Heading>
<div class={styles.grid}>
  <GridItem title="Archer Blueprint: Stage Unlocked">
    <div class={styles.table}>
      <Heading textAlign="center" fontSize="xl">Grade</Heading>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
      {#each Object.keys(designStageUnlock) as item}
        <div class={styles.tableItem}>
          <GradeStars grade={+item} size={4} />
        </div>
        <div class={styles.tableItem}>
          <Text textAlign="center">{designStageUnlock[item]}</Text>
        </div>
      {/each}
    </div>
  </GridItem>
  <GridItem title="Archer Promote: Stage Unlocked">
    <div class={styles.table}>
      <Heading textAlign="center" fontSize="xl">Grade</Heading>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
      {#each Object.keys(archerPromoteStageRequirements) as item}
        <div class={styles.tableItem}>
          <GradeStars grade={+item} size={4} />
        </div>
        <div class={styles.tableItem}>
          <Text textAlign="center">{archerPromoteStageRequirements[item]}</Text>
        </div>
      {/each}
    </div>
  </GridItem>
  <GridItem title="Hero Gear:  Stage Unlocked">
    <div class={styles.table}>
      <Heading textAlign="center" fontSize="xl">Grade</Heading>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
      {#each Object.keys(heroGearStageUnlock) as item}
        <div class={styles.tableItem}>
          <GradeStars grade={+item} size={4} />
        </div>
        <div class={styles.tableItem}>
          <Text textAlign="center">{heroGearStageUnlock[item]}</Text>
        </div>
      {/each}
    </div>
  </GridItem>
  <GridItem title="Enemy CC Resist">
    <div class={styles.table}>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
      <Heading textAlign="center" fontSize="xl">CC Resist</Heading>
      {#each Object.keys(enemyCCResist) as item}
        <div class={styles.tableItem}>
          <Text>{enemyCCResist[item]}</Text>
        </div>
        <div class={styles.tableItem}>
          <Text textAlign="center">{item}%</Text>
        </div>
      {/each}
    </div>
  </GridItem>
  <GridItem title="Ultra Summon Gear: Stage Unlocked">
    <div class={styles.table3Columns}>
      <Heading textAlign="center" fontSize="xl">Step</Heading>
      <Heading textAlign="center" fontSize="xl">Highest Grade</Heading>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
      {#each Object.keys(ultraSummonStageUnlockGrades) as item}
        <div class={styles.tableItem}>
          <Text>{item}</Text>
        </div>
        <div class={styles.tableItem}>
          <GradeStars grade={ultraSummonStageUnlockGrades[item].grade} size={4} />
        </div>
        <div class={styles.tableItem}>
          <Text>{ultraSummonStageUnlockGrades[item].stage}</Text>
        </div>
      {/each}
    </div>
  </GridItem>
  <GridItem title="Sanctuary Runes: Stage Unlocked">
    <div class={styles.table4Columns}>
      <Heading textAlign="center" fontSize="xl">Step</Heading>
      <Heading textAlign="center" fontSize="xl">Highest Grade</Heading>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
      <Heading textAlign="center" fontSize="xl">Exp</Heading>
      {#each Object.keys(runesSummonStageUnlock) as item}
        <div class={styles.tableItem}>
          <Text>{item}</Text>
        </div>
        <div class={styles.tableItem}>
          <GradeStars grade={runesSummonStageUnlock[item].grade} size={4} />
        </div>
        <div class={styles.tableItem}>
          <Text>{runesSummonStageUnlock[item].stage}</Text>
        </div>
        <div class={styles.tableItem}>
          <Text>{runesSummonStageUnlock[item].exp}</Text>
        </div>
      {/each}
    </div>
  </GridItem>
</div>
