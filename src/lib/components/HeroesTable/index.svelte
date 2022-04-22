<script lang="ts">
  import HeroesTableItem from '$lib/components/HeroesTableItem/index.svelte';

  import * as styles from './index.css';

  export let heroes;
</script>

<div class={styles.table}>
  {#each heroes as hero (hero.id)}
    <HeroesTableItem {hero} />
  {/each}
</div>
