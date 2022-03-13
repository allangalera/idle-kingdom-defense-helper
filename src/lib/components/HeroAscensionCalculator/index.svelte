<script>
	import * as styles from './index.css';
	import AscensionStar from '$lib/components/AscensionStar/index.svelte';
	import Card from '$lib/components/Card/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import CardHeroShard from '$lib/components/CardHeroShard/index.svelte';
	import { ASCENSION } from '$lib/constants';

	let ascensionStartLevels = new Array(25).fill(false);
	let ascensionEndLevels = new Array(25).fill(false);
	let selectedStartLevel = 0;
	let selectedEndLevel = 0;

	ascensionStartLevels[0] = true;
	ascensionEndLevels[0] = true;

	let shardsCost = 0;
	let ascensionStonesCost = 0;

	let ascensionGroups = [
		[0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1],
		[2, 2, 2, 2, 2],
		[3, 3, 3, 3, 3],
		[4, 4, 4, 4, 4],
	];

	function onAscencionStartClick(level) {
		ascensionStartLevels = ascensionStartLevels.map((startLevel, index) =>
			index >= level ? false : true
		);
		selectedStartLevel = level;
	}

	function onAscencionEndClick(level) {
		ascensionEndLevels = ascensionEndLevels.map((startLevel, index) =>
			index >= level ? false : true
		);
		selectedEndLevel = level;
	}

	function calculateCost(startLevel, endLevel) {
		shardsCost = 0;
		ascensionStonesCost = 0;
		let ascensionStonesCostLevel = 0;
		if (startLevel >= endLevel) return;
		for (let level = 1; level <= endLevel; level++) {
			let ascensionIncrement = ASCENSION.ASCENSION_STONE_PER_5_LEVELS[Math.floor(level / 5)];
			ascensionStonesCostLevel += ascensionIncrement;
			if (level > startLevel) {
				shardsCost += (level + 1) * ASCENSION.SHARD_PER_LEVEL;
				ascensionStonesCost += ascensionStonesCostLevel;
			}
		}
		console.groupEnd();
	}

	$: calculateCost(selectedStartLevel, selectedEndLevel);
</script>

<div class={styles.container}>
	<div class={styles.innerContainer}>
		<Text textAlign="center">From</Text>
		<div class={styles.ascensionLevelContainer}>
			{#each ascensionGroups as ascensionGroup, index1}
				<div class={styles.ascensionLevel}>
					{#each ascensionGroup as level, index2}
						<AscensionStar
							selected={ascensionStartLevels[index1 * 5 + index2]}
							on:click={() => onAscencionStartClick(index1 * 5 + index2)}
							ascensionLevel={index1}
						/>
					{/each}
				</div>
			{/each}
		</div>
	</div>
	<div class={styles.innerContainer}>
		<Text textAlign="center">To</Text>
		<div class={styles.ascensionLevelContainer}>
			{#each ascensionGroups as ascensionGroup, index1}
				<div class={styles.ascensionLevel}>
					{#each ascensionGroup as level, index2}
						<AscensionStar
							selected={ascensionEndLevels[index1 * 5 + index2]}
							on:click={() => onAscencionEndClick(index1 * 5 + index2)}
							ascensionLevel={index1}
						/>
					{/each}
				</div>
			{/each}
		</div>
	</div>
	<div class={styles.result}>
		<div class={styles.shardResult}>
			<CardHeroShard value={shardsCost} />
		</div>
		<div class={styles.ascensionStoneResult}>
			<Card cardType="ascension-stone" value={ascensionStonesCost} />
		</div>
	</div>
</div>
