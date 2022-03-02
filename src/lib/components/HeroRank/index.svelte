<script>
	import { container } from './index.css';
	import Row from '$lib/components/RankRow/index.svelte';
	export let heroRank;
</script>

<div class={container}>
	{#each heroRank as rank, i}
		<Row title={rank.title} rank={i} heroList={rank.heroList} />
	{/each}
</div>
