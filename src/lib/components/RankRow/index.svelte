<script>
	import * as styles from './index.css';
	import CardHero from '$lib/components/CardHero/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import { heroes } from '$lib/db/heroes';
	export let title;
	export let rank;
	export let heroList;

	let heroListWithHeroData = heroList.map((heroName) => {
		return heroes.find((hero) => hero.name === heroName);
	});
</script>

<div class={styles.containerVariant[`rank${rank}`]}>
	<div class={styles.titleContainerVariant[`rank${rank}`]}>
		<Text textAlign="center" color="black">{title}</Text>
	</div>
	<div class={styles.heroesContainer}>
		{#each heroListWithHeroData as hero, i}
			<div>
				{#if hero}
					<CardHero {hero} />
				{/if}
			</div>
		{/each}
	</div>
</div>
