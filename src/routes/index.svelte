<script>
	import HeroRank from '$lib/components/HeroRank/index.svelte';
	import HeroList from '$lib/components/HeroList/index.svelte';

	import { heroes, heroRankLateGame, heroRankEarlyGame } from '$lib/db';
</script>

<h1>Idle Kingdom Best Heroes</h1>
<HeroList heroList={heroes} />
<div class="container">
	<h2>Early Game</h2>
	<HeroRank heroRank={heroRankEarlyGame} />
	<h2>Late Game</h2>
	<HeroRank heroRank={heroRankLateGame} />
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
