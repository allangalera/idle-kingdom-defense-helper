<script lang="ts">
  import HeroesTableItem from '$lib/components/HeroesTableItem/index.svelte';
  import { HeroesVisualizationModes } from '$lib/enums';
  import { heroesVisualization } from '$lib/shared/stores/heroesVisualization';
  import { match } from 'oxide.ts';

  import * as styles from './index.css';

  export let heroes;
  let tableStyle = 'default';

  heroesVisualization.subscribe((value) => {
    tableStyle = match(value, [[HeroesVisualizationModes.minimal, 'minimal'], () => 'default']);
  });
</script>

<div class={styles.tableVariant[tableStyle]}>
  {#each heroes as hero (hero.id)}
    <HeroesTableItem {hero} />
  {/each}
</div>
