<script lang="ts">
	import * as styles from './index.css';
	import { equals } from 'ramda';

	import gearUnlockLevelsJson from '$lib/data/gearUnlockLevels.json';

	import Input from '$lib/components/Input/index.svelte';
	import Text from '$lib/components/Text/index.svelte';

	let stage = '1';
	let result = '';
	let gear = {
		hero: {
			weapon: false,
			helmet: false,
			armor: false,
			boots: false,
		},
		archer: {
			bow: false,
			arrow: false,
			helmet: false,
			armor: false,
			gloves: false,
			boots: false,
		},
	};

	function returnItemLevelDropFromStage(stage) {
		let archer = null;
		let hero = null;
		for (const level of Object.keys(gearUnlockLevelsJson)) {
			if (level > stage) break;
			let archerDrop = gearUnlockLevelsJson[level].filter((item) => item.includes('archer'));
			if (archerDrop.length)
				archer = {
					full: archerDrop[0],
					rarity: archerDrop[0].split('-')[1],
					stars: archerDrop[0].split('-')[2],
				};
			let heroDrop = gearUnlockLevelsJson[level].filter((item) => item.includes('hero'));
			if (heroDrop.length)
				hero = {
					full: heroDrop[0],
					rarity: heroDrop[0].split('-')[1],
					stars: heroDrop[0].split('-')[2],
				};
		}

		return { archer, hero };
	}

	function calculateHeroDropFromStage(stage) {
		const stageDrops = ['all', 'weapon', 'helmet', 'armor', 'boots'];

		return stageDrops[stage % 5];
	}

	function calculateArcherDropFromStage(stage) {
		const drops = ['all', 'bow', 'arrow', 'helmet', 'armor', 'gloves', 'boots'];

		return drops[stage % 7];
	}

	const updateGearData = (type: 'archer' | 'hero', currentGear: string) => (event) => {
		gear = {
			...gear,
			...{
				[type]: {
					...gear[type],
					...{
						[currentGear]: event.target.checked,
					},
				},
			},
		};
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

	function validateIfGearIsValid(bestGear, stageGear, wanted) {
		let hasHeroGear = wanted.hero.length > 0;
		let hasArcherGear = wanted.archer.length > 0;

		if (!bestGear.hero && !bestGear.archer) return false;

		if (hasHeroGear && hasArcherGear) {
			return equals(bestGear, stageGear);
		} else if (hasHeroGear) {
			return equals(bestGear.hero, stageGear.hero);
		} else if (hasArcherGear) {
			return equals(bestGear.archer, stageGear.archer);
		}
		return equals(bestGear, stageGear);
	}

	function calculateStage(stage: string, gearToFind) {
		let parsedStage = +stage;
		if (!parsedStage) return;
		const bestGear = returnItemLevelDropFromStage(parsedStage);
		const wantedGear = returnGearsToFind(gearToFind);
		let currentStage = parsedStage - 1;
		let hasGear = true;
		let stages = [];
		while (hasGear) {
			let stageGear = returnItemLevelDropFromStage(currentStage);
			let validate = validateIfGearIsValid(bestGear, stageGear, wantedGear);
			hasGear = validate;
			let heroDropFromStage = calculateHeroDropFromStage(currentStage);
			let archerDropFromStage = calculateArcherDropFromStage(currentStage);

			if (
				(wantedGear.hero.length > 1 || wantedGear.hero.length === 0) &&
				(wantedGear.archer.length > 1 || wantedGear.archer.length === 0)
			) {
				if (heroDropFromStage === 'all' && archerDropFromStage === 'all') stages.push(currentStage);
			} else {
				if (wantedGear.archer.length > 1 && wantedGear.hero.length === 1) {
					if (archerDropFromStage === 'all' && wantedGear.hero.includes(heroDropFromStage))
						stages.push(currentStage);
				} else if (wantedGear.archer.length === 1 && wantedGear.hero.length > 1) {
					if (heroDropFromStage === 'all' && wantedGear.archer.includes(archerDropFromStage))
						stages.push(currentStage);
				} else if (wantedGear.archer.length === 1 && wantedGear.hero.length === 1) {
					if (
						wantedGear.archer.includes(archerDropFromStage) &&
						heroDropFromStage !== 'all' &&
						wantedGear.hero.includes(heroDropFromStage) &&
						archerDropFromStage !== 'all'
					)
						stages.push(currentStage);
				} else {
					if (
						(wantedGear.archer.includes(archerDropFromStage) && heroDropFromStage !== 'all') ||
						(wantedGear.hero.includes(heroDropFromStage) && archerDropFromStage !== 'all')
					)
						stages.push(currentStage);
				}
			}

			currentStage--;
		}
		result = JSON.stringify(stages);
	}

	$: calculateStage(stage, gear);
</script>

<div class={styles.container}>
	<div>
		<Input
			bind:value={stage}
			maskOptions={{
				mask: Number,
				min: 0,
				max: 13000,
			}}
			label="Current stage"
		/>
		<Text>Hero</Text>
		<div class={styles.flex}>
			<label>
				<Text>Weapon</Text>
				<input type="checkbox" on:change={updateGearData('hero', 'weapon')} />
			</label>
			<label>
				<Text>Armor</Text>
				<input type="checkbox" on:change={updateGearData('hero', 'armor')} />
			</label>
			<label>
				<Text>Helmet</Text>
				<input type="checkbox" on:change={updateGearData('hero', 'helmet')} />
			</label>
			<label>
				<Text>Boots</Text>
				<input type="checkbox" on:change={updateGearData('hero', 'boots')} />
			</label>
		</div>
		<Text>Archer</Text>
		<div class={styles.flex}>
			<label>
				<Text>Bow</Text>
				<input type="checkbox" on:change={updateGearData('archer', 'bow')} />
			</label>
			<label>
				<Text>Arrow</Text>
				<input type="checkbox" on:change={updateGearData('archer', 'arrow')} />
			</label>
			<label>
				<Text>Helmet</Text>
				<input type="checkbox" on:change={updateGearData('archer', 'helmet')} />
			</label>
			<label>
				<Text>Armor</Text>
				<input type="checkbox" on:change={updateGearData('archer', 'armor')} />
			</label>
			<label>
				<Text>Gloves</Text>
				<input type="checkbox" on:change={updateGearData('archer', 'gloves')} />
			</label>
			<label>
				<Text>Boots</Text>
				<input type="checkbox" on:change={updateGearData('archer', 'boots')} />
			</label>
		</div>
	</div>
	<div><Text>Result: {result}</Text></div>
</div>
