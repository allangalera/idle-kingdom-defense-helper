<script lang="ts">
	import * as styles from './heroes.css';
	import { heroes, defaultSortingHeroes } from '$lib/db/heroes';
	import Text from '$lib/components/Text/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import HeroesTable from '$lib/components/HeroesTable/index.svelte';
	import { HeroesSearchValues, HeroesVisualizationModes } from '$lib/enums';
	import { without, pathOr } from 'ramda';
	import { matchSorter } from 'match-sorter';
	import { heroesVisualization } from '$lib/shared/stores/heroesVisualization';
	import { heroes as heroesStore } from '$lib/shared/stores/user/heroes';
	let searchParameter;

	let filteredHeroes = heroes;

	let searchKeys = [
		HeroesSearchValues.name,
		HeroesSearchValues.skillName,
		HeroesSearchValues.skillDescription,
	];

	function onChangeViewMode(event) {
		const { value } = event.target;
		heroesVisualization.set(value);
	}

	function onChangeSearchKeys(event) {
		const { value, checked } = event.target;
		if (checked) searchKeys = [...searchKeys, value];
		else searchKeys = without([value], searchKeys);
	}

	function searchHero(input, keys) {
		let userHeroes = heroes.map((hero) => {
			let userHero = pathOr([], ['heroes'], $heroesStore).find((userH) => userH.id === hero.id);
			return {
				...hero,
				...userHero,
			};
		});
		userHeroes = defaultSortingHeroes(userHeroes);
		// console.log({ userHeroes });
		return matchSorter(userHeroes, input, {
			keys,
			sorter: (rankedItems) => rankedItems,
			threshold: matchSorter.rankings.CONTAINS,
		});
	}

	heroesStore.subscribe(() => {
		filteredHeroes = searchHero(searchParameter, searchKeys);
	});

	$: filteredHeroes = searchHero(searchParameter, searchKeys);
</script>

<div class={styles.container}>
	<div class={styles.formContainer}>
		<Input label="Search" bind:value={searchParameter} />
		<div class={styles.configurations}>
			<div class={styles.inputGroup}>
				<Text>Attributes to search:</Text>
				<div class={styles.inputContainer}>
					<label class={styles.input}>
						<input
							type="checkbox"
							value={HeroesSearchValues.name}
							checked
							on:change={onChangeSearchKeys}
						/>
						<Text>name</Text>
					</label>
					<label class={styles.input}>
						<input
							type="checkbox"
							value={HeroesSearchValues.skillName}
							checked
							on:change={onChangeSearchKeys}
						/>
						<Text>Skill name</Text>
					</label>
					<label class={styles.input}>
						<input
							type="checkbox"
							value={HeroesSearchValues.skillDescription}
							checked
							on:change={onChangeSearchKeys}
						/>
						<Text>Skill description</Text>
					</label>
				</div>
			</div>
			<div class={styles.inputGroup}>
				<Text>View Mode</Text>
				<div class={styles.inputContainer}>
					<label class={styles.input}>
						<input
							type="radio"
							name="view-mode"
							value={HeroesVisualizationModes.compact}
							checked={$heroesVisualization === HeroesVisualizationModes.compact}
							on:change={onChangeViewMode}
						/>
						<Text>Compact</Text>
					</label>
					<label class={styles.input}>
						<input
							type="radio"
							name="view-mode"
							value={HeroesVisualizationModes.minimal}
							checked={$heroesVisualization === HeroesVisualizationModes.minimal}
							on:change={onChangeViewMode}
						/>
						<Text>Minimal</Text>
					</label>
					<label class={styles.input}>
						<input
							type="radio"
							name="view-mode"
							value={HeroesVisualizationModes.detailed}
							checked={$heroesVisualization === HeroesVisualizationModes.detailed}
							on:change={onChangeViewMode}
						/>
						<Text>Detailed</Text>
					</label>
				</div>
			</div>
		</div>
	</div>
	<HeroesTable heroes={filteredHeroes} />
</div>
