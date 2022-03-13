<script lang="ts">
	import * as styles from './index.css';
	import Text from '$lib/components/Text/index.svelte';
	import CardGear from '$lib/components/CardGear/index.svelte';

	export let stageData: {
		stage: number;
		enemy: {
			unitCnt: number;
			unitId: number;
		}[];
		drop: any;
		bestGear: any;
	};

	let shouldShowHeroGear = Boolean(stageData?.bestGear?.hero) && Boolean(stageData?.drop?.hero);
	let shouldShowArcherGear =
		Boolean(stageData?.bestGear?.archer) && Boolean(stageData?.drop?.archer);
</script>

<div class={styles.flex}>
	<div>
		<Text fontSize="2xl">{stageData.stage}</Text>
	</div>
	<div class={styles.details}>
		{#each stageData.enemy as unities}
			{#if unities.unitCnt !== 1}
				<img src={`images/enemies/enemy${unities.unitId}.png`} alt="enemy" />
			{/if}
		{/each}
		<div class={styles.drop}>
			{#if shouldShowHeroGear}
				<CardGear
					width={14}
					gearType={{
						type: 'hero',
						equip: stageData.drop.hero,
						rarity: stageData.bestGear.hero.rarity,
						level: stageData.bestGear.hero.stars.length,
					}}
				/>
			{/if}
			{#if shouldShowArcherGear}
				<CardGear
					width={14}
					gearType={{
						type: 'blueprint',
						equip: stageData.drop.archer,
						rarity: stageData.bestGear.archer.rarity,
						level: stageData.bestGear.archer.stars.length,
					}}
				/>
			{/if}
		</div>
	</div>
</div>
