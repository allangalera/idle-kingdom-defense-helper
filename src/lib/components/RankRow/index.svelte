<script>
	import * as styles from './index.css';
	import Hero from '$lib/components/Hero/index.svelte';
	export let title;
	export let rank;
	export let heroList;
</script>

<div class={styles.containerVariant[`rank${rank}`]}>
	<div class={styles.titleContainerVariant[`rank${rank}`]}>
		<h1 class={styles.title}>{title}</h1>
	</div>
	<div class={styles.heroesContainer}>
		{#each heroList as hero}
			<Hero {hero} />
		{/each}
	</div>
</div>
