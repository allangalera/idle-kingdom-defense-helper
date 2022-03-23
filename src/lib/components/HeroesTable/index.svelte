<script lang="ts">
	import * as styles from './index.css';
	import HeroesTableItem from '$lib/components/HeroesTableItem/index.svelte';
	export let heroes;
</script>

<div class={styles.table}>
	{#each heroes as hero}
		<HeroesTableItem {hero} />
	{/each}
</div>
