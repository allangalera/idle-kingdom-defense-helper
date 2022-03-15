<script lang="ts">
	import * as styles from './index.css';
	import { pathOr } from 'ramda';

	import CardToggle from '$lib/components/CardToggle/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import StageResult from '$lib/components/StageResult/index.svelte';
	import Heading from '$lib/components/Heading/index.svelte';
	import { HeroGearEquip, ArcherGearEquip, RarityEnum } from '$lib/enums';
	import { MAX_STAGE_LEVEL } from '$lib/constants';
	import { calculateStage } from '$lib/utils/stage';

	let timer;
	let stage = '1';
	let result = [];
	let bestGear;
	let gear = {
		hero: {
			weapon: false,
			helmet: false,
			chest: false,
			boots: false,
		},
		archer: {
			bow: false,
			arrow: false,
			helmet: false,
			chest: false,
			gloves: false,
			boots: false,
		},
	};

	function returnGearsToFind(gears) {
		let wanted = {
			hero: [],
			archer: [],
		};
		for (const heroGear of Object.keys(gear.hero)) {
			if (gear.hero[heroGear]) wanted.hero.push(heroGear);
		}
		for (const archerGear of Object.keys(gear.archer)) {
			if (gear.archer[archerGear]) wanted.archer.push(archerGear);
		}

		return wanted;
	}

	function debounce(stage, gear) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const { stages, currentBestGear } = calculateStage(stage, returnGearsToFind(gear));
			result = stages;
			bestGear = currentBestGear;
		}, 500);
	}

	$: debounce(stage, gear);
</script>

<div class={styles.container}>
	<Input
		textAlign="center"
		bind:value={stage}
		maskOptions={{
			mask: Number,
			min: 0,
			max: MAX_STAGE_LEVEL,
		}}
		label="Current stage"
	/>
	<Text>Hero</Text>
	<div class={styles.flex}>
		<CardToggle
			gearType={{
				type: 'hero',
				equip: HeroGearEquip.weapon,
				rarity: pathOr(RarityEnum.common, ['hero', 'rarity'], bestGear),
				level: pathOr(1, ['hero', 'level'], bestGear),
			}}
			bind:checked={gear.hero.weapon}
		/>
		<CardToggle
			gearType={{
				type: 'hero',
				equip: HeroGearEquip.helmet,
				rarity: pathOr(RarityEnum.common, ['hero', 'rarity'], bestGear),
				level: pathOr(1, ['hero', 'level'], bestGear),
			}}
			bind:checked={gear.hero.helmet}
		/>
		<CardToggle
			gearType={{
				type: 'hero',
				equip: HeroGearEquip.chest,
				rarity: pathOr(RarityEnum.common, ['hero', 'rarity'], bestGear),
				level: pathOr(1, ['hero', 'level'], bestGear),
			}}
			bind:checked={gear.hero.chest}
		/>
		<CardToggle
			gearType={{
				type: 'hero',
				equip: HeroGearEquip.boots,
				rarity: pathOr(RarityEnum.common, ['hero', 'rarity'], bestGear),
				level: pathOr(1, ['hero', 'level'], bestGear),
			}}
			bind:checked={gear.hero.boots}
		/>
	</div>
	<Text>Archer</Text>
	<div class={styles.flex}>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: ArcherGearEquip.bow,
				rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.bow}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: ArcherGearEquip.arrow,
				rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.arrow}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: ArcherGearEquip.helmet,
				rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.helmet}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: ArcherGearEquip.chest,
				rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.chest}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: ArcherGearEquip.gloves,
				rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.gloves}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: ArcherGearEquip.boots,
				rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.boots}
		/>
	</div>
	{#if result.length > 0}
		<Heading>Results</Heading>
		<div class={styles.flex}>
			{#each result as stageData (stageData.stage)}
				<StageResult {stageData} />
			{/each}
		</div>
	{/if}
</div>
