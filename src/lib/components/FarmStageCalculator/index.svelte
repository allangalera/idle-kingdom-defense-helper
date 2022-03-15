<script lang="ts">
	import * as styles from './index.css';
	import { equals, pathOr, clone } from 'ramda';

	import gearUnlockLevelsJson from '$lib/data/gearUnlockLevels.json';
	import { getEnemyIdFromStage } from '$lib/db';

	import CardToggle from '$lib/components/CardToggle/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import StageResult from '$lib/components/StageResult/index.svelte';
	import Heading from '$lib/components/Heading/index.svelte';
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

	function returnItemLevelDropFromStage(stage) {
		let archer = {};
		let hero = {};
		for (const level of Object.keys(gearUnlockLevelsJson)) {
			if (level > stage) break;
			let archerDrop = gearUnlockLevelsJson[level].filter((item) => item.includes('archer'));
			if (archerDrop.length) {
				archer['full'] = archerDrop[0];
				archer['rarity'] = archerDrop[0].split('-')[1];
				archer['level'] = +archerDrop[0].split('-')[2];
			}
			let heroDrop = gearUnlockLevelsJson[level].filter((item) => item.includes('hero'));
			if (heroDrop.length) {
				hero['full'] = heroDrop[0];
				hero['rarity'] = heroDrop[0].split('-')[1];
				hero['level'] = +heroDrop[0].split('-')[2];
			}
		}

		return { archer, hero };
	}

	function calculateHeroDropFromStage(stage) {
		const stageDrops = ['all', 'weapon', 'helmet', 'chest', 'boots'];

		return stageDrops[stage % 5];
	}

	function calculateArcherDropFromStage(stage) {
		const drops = ['all', 'bow', 'arrow', 'helmet', 'chest', 'gloves', 'boots'];

		return drops[stage % 7];
	}

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

	function validateIfGearIsValid(currentBestGear, stageGear, wanted) {
		let hasHeroGear = wanted.hero.length > 0;
		let hasArcherGear = wanted.archer.length > 0;

		if (!currentBestGear.hero && !currentBestGear.archer) return false;

		if (hasHeroGear && hasArcherGear) {
			return equals(currentBestGear, stageGear);
		} else if (hasHeroGear && !hasArcherGear) {
			return equals(currentBestGear.hero, stageGear.hero);
		} else if (!hasHeroGear && hasArcherGear) {
			return equals(currentBestGear.archer, stageGear.archer);
		}

		return equals(currentBestGear, stageGear);
	}

	function calculateStage(stage: string, gearToFind) {
		let parsedStage = +stage;
		if (!parsedStage) return;
		let currentBestGear = returnItemLevelDropFromStage(parsedStage);
		const wantedGear = returnGearsToFind(gearToFind);

		let stages = [];
		let stageGear;

		let currentStage = parsedStage - 1;
		while (currentStage >= 0) {
			stageGear = returnItemLevelDropFromStage(currentStage);
			let validate = validateIfGearIsValid(currentBestGear, stageGear, wantedGear);

			if (!validate && stages.length === 0) {
				currentBestGear = stageGear;
			} else if (!validate) {
				break;
			}

			let heroDropFromStage = calculateHeroDropFromStage(currentStage);
			let archerDropFromStage = calculateArcherDropFromStage(currentStage);
			let enemyType = getEnemyIdFromStage(currentStage);

			const currentStageData = {
				stage: currentStage,
				enemy: enemyType,
				drop: {
					hero: heroDropFromStage,
					archer: archerDropFromStage,
				},
				bestGear: stageGear,
			};

			const condition = `${Math.min(wantedGear.hero.length, 2)}-${Math.min(
				wantedGear.archer.length,
				2
			)}`;

			let step = 1;

			switch (condition) {
				case '0-0':
					if (heroDropFromStage === 'all' && archerDropFromStage === 'all') {
						stages.push(currentStageData);
						step = 35;
					}
					break;
				case '0-1':
					if (wantedGear.archer.includes(archerDropFromStage)) {
						stages.push(currentStageData);
						step = 7;
					}
					break;
				case '0-2':
					if (archerDropFromStage === 'all') {
						stages.push(currentStageData);
						step = 7;
					}
					break;
				case '1-0':
					if (wantedGear.hero.includes(heroDropFromStage)) {
						stages.push(currentStageData);
						step = 5;
					}
					break;
				case '1-1':
					if (
						wantedGear.hero.includes(heroDropFromStage) &&
						wantedGear.archer.includes(archerDropFromStage)
					) {
						stages.push(currentStageData);
						currentStage += -35;
						step = 35;
					}
					break;
				case '1-2':
					if (wantedGear.hero.includes(heroDropFromStage) && archerDropFromStage === 'all') {
						stages.push(currentStageData);
						step = 35;
					}
					break;
				case '2-0':
					if (heroDropFromStage === 'all') {
						stages.push(currentStageData);
						step = 5;
					}
					break;
				case '2-1':
					if (heroDropFromStage === 'all' && wantedGear.archer.includes(archerDropFromStage)) {
						stages.push(currentStageData);
						step = 35;
					}
					break;
				case '2-2':
					if (heroDropFromStage === 'all' && archerDropFromStage === 'all') {
						stages.push(currentStageData);
						step = 35;
					}
					break;
			}
			currentStage -= step;
		}
		result = stages;
		bestGear = currentBestGear;
	}

	function debounce(stage, gear) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			calculateStage(stage, gear);
		}, 250);
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
			max: 15000,
		}}
		label="Current stage"
	/>
	<Text>Hero</Text>
	<div class={styles.flex}>
		<CardToggle
			gearType={{
				type: 'hero',
				equip: 'weapon',
				rarity: pathOr('common', ['hero', 'rarity'], bestGear),
				level: pathOr(1, ['hero', 'level'], bestGear),
			}}
			bind:checked={gear.hero.weapon}
		/>
		<CardToggle
			gearType={{
				type: 'hero',
				equip: 'helmet',
				rarity: pathOr('common', ['hero', 'rarity'], bestGear),
				level: pathOr(1, ['hero', 'level'], bestGear),
			}}
			bind:checked={gear.hero.helmet}
		/>
		<CardToggle
			gearType={{
				type: 'hero',
				equip: 'chest',
				rarity: pathOr('common', ['hero', 'rarity'], bestGear),
				level: pathOr(1, ['hero', 'level'], bestGear),
			}}
			bind:checked={gear.hero.chest}
		/>
		<CardToggle
			gearType={{
				type: 'hero',
				equip: 'boots',
				rarity: pathOr('common', ['hero', 'rarity'], bestGear),
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
				equip: 'bow',
				rarity: pathOr('common', ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.bow}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: 'arrow',
				rarity: pathOr('common', ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.arrow}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: 'helmet',
				rarity: pathOr('common', ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.helmet}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: 'chest',
				rarity: pathOr('common', ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.chest}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: 'gloves',
				rarity: pathOr('common', ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.gloves}
		/>
		<CardToggle
			gearType={{
				type: 'blueprint',
				equip: 'boots',
				rarity: pathOr('common', ['archer', 'rarity'], bestGear),
				level: pathOr(1, ['archer', 'level'], bestGear),
			}}
			bind:checked={gear.archer.boots}
		/>
	</div>
	<Heading>Results</Heading>
	<div class={styles.flex}>
		{#if result.length > 0}
			{#each result as stageData (stageData.stage)}
				<StageResult {stageData} />
			{/each}
		{/if}
	</div>
</div>
