<script>
	import HeroRank from '$lib/components/HeroRank/index.svelte';
	import { newHeroRankList } from '$lib/db';
</script>

<div class="container">
	<h1>Idle Kingdom Best Heroes</h1>
	<HeroRank heroRank={newHeroRankList} />
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
		flex-direction: column;
		gap: 16px;
	}
</style>
