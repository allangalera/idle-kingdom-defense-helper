<script lang="ts">
	import * as styles from './index.css';

	import Text from '$lib/components/Text/index.svelte';
	import AscensionStar from '$lib/components/AscensionStar/index.svelte';
	import Card from '$lib/components/Card/index.svelte';
	import { archerPromoteProgressionByGrade } from '$lib/db/archer';

	let ascensionStartLevels = new Array(25).fill(false);
	let ascensionEndLevels = new Array(25).fill(false);
	let selectedStartLevel = 0;
	let selectedEndLevel = 1;
	let steelCost = 0;

	ascensionStartLevels[0] = true;
	ascensionEndLevels[0] = true;
	ascensionEndLevels[1] = true;
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
		steelCost = 0;

		if (startLevel >= endLevel) return;
		for (let level = startLevel; level < endLevel; level++) {
			steelCost += archerPromoteProgressionByGrade[level + 1].iron;
		}
	}

	console.log({ archerPromoteProgressionByGrade });

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
		<div class={styles.ascensionStoneResult}>
			<Card cardType="steel" value={steelCost} />
		</div>
	</div>
</div>
