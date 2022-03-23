<script lang="ts">
	import * as styles from './index.css';
	import { kingdoms } from '$lib/db/conquest';
	import { sortKingdomByAscensionStoneAndCoin } from '$lib/utils/conquest';
	import Heading from '$lib/components/Heading/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import { sprinkles } from '$lib/styles/sprinkles.css';

	let sortedKingdoms = sortKingdomByAscensionStoneAndCoin(kingdoms);

	const borderColorByContinent = {
		1: 'green9',
		2: 'blue9',
		3: 'brown9',
	};
	const backgroundByContinent = {
		1: 'green3',
		2: 'blue3',
		3: 'brown3',
	};
</script>

<div class={styles.container}>
	<Heading textAlign="center" fontSize="base">Capital</Heading>
	<Heading textAlign="center" fontSize="base">Ascension Stone Reward</Heading>
	<Heading textAlign="center" fontSize="base">Gold Reward</Heading>
	{#each sortedKingdoms as kingdom (kingdom.id)}
		<div class={styles.kingdomNameContainer}>
			<div
				class={[
					styles.kingdomName,
					sprinkles({
						background: backgroundByContinent[kingdom.continentId],
						borderColor: borderColorByContinent[kingdom.continentId],
					}),
				].join(' ')}
			>
				<Text as="span" fontSize="sm">{kingdom.continent} {kingdom.id}</Text>
			</div>
		</div>
		<Text textAlign="center">{kingdom.rewardEvolve}</Text>
		<Text textAlign="center">{kingdom.rewardGold.toLocaleString()}</Text>
	{/each}
</div>
