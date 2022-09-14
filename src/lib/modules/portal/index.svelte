<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import { stagesByLegion } from '$lib/db/portal';
  import LegionTable from '$lib/modules/portal/LegionTable/index.svelte';

  import * as styles from './index.css';
</script>

<Heading textAlign="center" fontSize="3xl">Portal</Heading>
<div class={styles.grid}>
  {#each Object.keys(stagesByLegion) as legion}
    <LegionTable name={legion} data={stagesByLegion[legion]} />
  {/each}
</div>
