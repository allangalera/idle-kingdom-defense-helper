<script lang="ts">
	import * as styles from './index.css';
	import { kingdoms } from '$lib/db/conquest';
	import { clone, sortWith, prop, descend, pathOr, isNil } from 'ramda';
	import { conquest, addKingdom, removeKingdom } from '$lib/shared/stores/user/conquest';
	import { heroes as heroesStore } from '$lib/shared/stores/user/heroes';
	import { heroes } from '$lib/db/heroes';
	import {
		sortKingdomByAscensionStoneAndCoin,
		kingdomNameToRomanNumber,
	} from '$lib/utils/conquest';
	import Heading from '$lib/components/Heading/index.svelte';
	import CardHero from '$lib/components/CardHero/index.svelte';
	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import Button from '$lib/components/Button/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import { sprinkles } from '$lib/styles/sprinkles.css';

	let sortedKingdoms = sortKingdomByAscensionStoneAndCoin(kingdoms);
	let userKingdomsAndHeroes = [];

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

	const add = (kingdomId) => {
		addKingdom(kingdomId);
	};

	const remove = (kingdomId) => {
		removeKingdom(kingdomId);
	};

	const getHeroById = (heroId) => {
		if (isNil(heroId)) return false;
		return heroes.find((hero) => hero.id === heroId);
	};

	conquest.subscribe((value) => {
		let userKingdoms = pathOr([], ['kingdoms'], value);
		let sortedHeroes = sortWith([descend(prop('grade'))])(pathOr([], ['heroes'], $heroesStore));
		userKingdomsAndHeroes = sortedKingdoms.map((kingdom) => {
			const isKingdomAdded = userKingdoms.some((item) => item === kingdom.id);
			let heroSuggestion = null;
			if (isKingdomAdded) {
				heroSuggestion = sortedHeroes.shift();
			}
			if (heroSuggestion) {
				heroSuggestion = {
					...getHeroById(heroSuggestion.id),
					...heroSuggestion,
				};
			}
			return {
				...kingdom,
				isKingdomAdded,
				heroSuggestion,
			};
		});
	});
</script>

<div class={styles.container}>
	<!-- Heading -->
	<Heading textAlign="center" fontSize="base">Capital</Heading>
	<div class={styles.centerFlex}>
		<img class={styles.ascensionIcon} src="images/icons/iconEvolveStone.png" alt="ascension icon" />
	</div>
	<div class={styles.centerFlex}>
		<img class={styles.ascensionIcon} src="images/icons/iconGold.png" alt="gold icon" />
	</div>
	<Heading textAlign="center" fontSize="base">Action</Heading>
	<Heading textAlign="center" fontSize="lg">Hero</Heading>
	<!-- Body -->

	{#each userKingdomsAndHeroes as kingdom (kingdom.id)}
		<div
			class={[
				styles.kingdomName,
				sprinkles({
					background: backgroundByContinent[kingdom.continentId],
					borderColor: borderColorByContinent[kingdom.continentId],
					width: {
						mobile: 16,
						tablet: 24,
					},
				}),
			].join(' ')}
		>
			<Text as="span" fontSize={{ mobile: 'xs', tablet: 'sm' }} textAlign="center"
				>{kingdom.continent} {kingdomNameToRomanNumber(kingdom.name)}</Text
			>
		</div>
		<Text textAlign="center">{kingdom.rewardEvolve}</Text>
		<Text textAlign="center">{kingdom.rewardGold.toLocaleString()}</Text>
		<div class={styles.centerFlex}>
			{#if kingdom.isKingdomAdded}
				<Button type="button" variant="danger" on:click={() => remove(kingdom.id)}>
					<Text color="white" as="span">Rem</Text></Button
				>
			{:else}
				<Button type="button" variant="success" on:click={() => add(kingdom.id)}>
					<Text color="white" as="span">Add</Text></Button
				>
			{/if}
		</div>
		<div class={styles.centerFlex}>
			{#if kingdom.heroSuggestion}
				<CardHero hero={kingdom.heroSuggestion} width={12} heroTypeBadgeWidth={4} />
			{:else}
				<CardBorder width={12} heroTypeBadgeWidth={4} />
			{/if}
		</div>
	{/each}
</div>
