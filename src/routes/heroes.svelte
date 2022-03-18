<script lang="ts">
	import * as styles from './heroes.css';
	import { heroesGroupByTier } from '$lib/db/heroes';
	import CardHero from '$lib/components/CardHero/index.svelte';
	import { BaseGradeToTier } from '$lib/enums';

	console.log(heroesGroupByTier);
</script>

<div class={styles.container}>
	{#each Object.keys(heroesGroupByTier).reverse() as tier}
		<img
			class={styles.tierHeaderImage}
			src={`images/heroTier/sprCollectionTitle${tier}.png`}
			alt={`Heroes Tier ${BaseGradeToTier[tier]}`}
		/>
		<div class={styles.heroesContainer}>
			{#each heroesGroupByTier[tier] as hero}
				<CardHero {hero} />
			{/each}
		</div>
	{/each}
</div>
