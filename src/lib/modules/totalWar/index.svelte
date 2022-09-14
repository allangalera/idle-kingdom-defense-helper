<script lang="ts">
  import GradeStars from '$lib/components/GradeStars/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { totalwarDungeons } from '$lib/db/total-war';
  import * as tableStyles from '$lib/styles/table.css';
  import { getRowStyling } from '$lib/styles/utils';
</script>

<GridItem title="Total War: Dungeons">
  <div class={tableStyles.table5Columns}>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">id</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">dungeonId</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Continent</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Name</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="xl">Grade</Heading>
    </div>
    {#each totalwarDungeons as dungeon, row}
      <div class={tableStyles.tableRowVariant[getRowStyling(row)]}>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{dungeon.id}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{dungeon.dungeonId}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{dungeon.contId}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{dungeon.name}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <GradeStars grade={dungeon.grade} size={4} />
        </div>
      </div>
    {/each}
  </div>
</GridItem>
