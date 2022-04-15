<script lang="ts">
  import * as styles from './index.css';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import GradeStars from '$lib/components/GradeStars/index.svelte';
  import { designStageUnlock } from '$lib/db/stage';
</script>

<Heading textAlign="center" fontSize="xl">Information and Requirements</Heading>
<div class={styles.grid}>
  <GridItem title="Archer Blueprint: Stage Unlocked">
    <div class={styles.table}>
      <Heading textAlign="center" fontSize="xl">Grade</Heading>
      <Heading textAlign="center" fontSize="xl">Stage</Heading>
      {#each Object.keys(designStageUnlock) as item}
        <div class={styles.tableItem}>
          <GradeStars grade={+item} size={5} />
        </div>
        <div class={styles.tableItem}>
          <Text textAlign="center">{designStageUnlock[item]}</Text>
        </div>
      {/each}
    </div>
  </GridItem>
  <!-- <GridItem title="Archer Promote: Stage Unlocked" />
  <GridItem title="Hero Gear:  Stage Unlocked" />
  <GridItem title="Enemy CC Resist" />
  <GridItem title="Summon Gear: Stage Unlocked" />
  <GridItem title="Sanctuary Runes: Stage Unlocked" /> -->
</div>
