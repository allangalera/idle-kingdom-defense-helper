<script lang="ts">
	import HeroRank from '$lib/components/HeroRank/index.svelte';
	import Heading from '$lib/components/Heading/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import Link from '$lib/components/Link/index.svelte';
	import heroRankEarlyGame from '$lib/data/newHeroRankEarlyGame.json';
	import heroRankMidGame from '$lib/data/newHeroRankMidGame.json';
	import heroRankLateGame from '$lib/data/newHeroRankLateGame.json';
	import { sprinkles } from '$lib/styles/sprinkles.css';
</script>

<Heading textAlign="center" fontSize="4xl">Hero tier list</Heading>
<div
	class={sprinkles({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		gap: 8,
	})}
>
	<div
		class={sprinkles({
			maxWidth: 'full',
			display: 'flex',
			flexDirection: 'column',
			gap: 4,
		})}
	>
		<div>
			<Heading textAlign="center" fontSize="2xl">Early Game</Heading>
			<Text textAlign="center">0 - ~3000</Text>
			<Text textAlign="center">What's the meta?</Text>
			<Text textAlign="center">Hero damage.</Text>
		</div>
		<HeroRank heroRank={heroRankEarlyGame} />
	</div>

	<div
		class={sprinkles({
			maxWidth: 'full',
			display: 'flex',
			flexDirection: 'column',
			gap: 4,
		})}
	>
		<div>
			<Heading textAlign="center" fontSize="2xl">Mid Game</Heading>
			<Text textAlign="center">~2500 - ~7000</Text>
			<Text textAlign="center">What's the meta?</Text>
			<Text textAlign="center">Hero damage + buffers + CC</Text>
		</div>
		<HeroRank heroRank={heroRankMidGame} />
	</div>

	<div
		class={sprinkles({
			maxWidth: 'full',
			display: 'flex',
			flexDirection: 'column',
			gap: 4,
		})}
	>
		<div>
			<Heading textAlign="center" fontSize="2xl">Late Game</Heading>
			<Text textAlign="center">~6500+</Text>
			<Text textAlign="center">What's the meta?</Text>
			<Text textAlign="center">Archer's for damage. Heroes for CC. Sophia for healing.</Text>
		</div>
		<HeroRank heroRank={heroRankLateGame} />
	</div>
	<Text textAlign="center"
		>*Notes: Some heroes usefullness change based on their ascension level. Example: Julian is
		strong straight out of the gate but due to his poor ratios, he'll quickly become obsolete
		compared to someone like Diego. Vice versa: most low rank Warriors suck at low ascension levels
		(Diego, Randolph for example), but with each ascension, they become better than most higher rank
		Warriors. They are also easier to ascend. Some S-ranks in-general are just not used until later
		because of the slow ascension. You'll have to judge for yourself who to use and when to swap.
		The meta also changes as you progress so heroes will swap around as needed. The meta described
		is based on our own experiences for the fastest way to climb each stage of the game. With all of
		that said, team comps can vary slightly and can change based on your shard luck</Text
	>
	<Link
		href="https://docs.google.com/spreadsheets/d/1vFvsZKEJ4h1p59akNhxlpprNdVqfGlEPyuu5M02KLUE/edit#gid=1823157383"
		target="_blank">Source</Link
	>
</div>
