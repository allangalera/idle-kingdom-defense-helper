<script lang="ts">
	import HeroesTableItem from '$lib/components/HeroesTableItem/index.svelte';
	import { heroesVisualization } from '$lib/shared/stores/heroesVisualization';
	import { HeroesVisualizationModes } from '$lib/types/enums';
	import * as styles from './index.css';
	import { match } from 'oxide.ts';

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
