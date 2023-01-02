<script lang="ts">
	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import type { Sprinkles } from '$lib/styles/sprinkles.css';
	import {
		convertGradeToRarityAndLevel,
		getLevelFromGrade,
		getRarityFromGrade,
		returnRarityName,
	} from '$lib/utils/hero';
	import * as styles from './index.css';

	console.log('aqui');

	export let artifactData: {};
	export let width: Sprinkles['width'] = 24;

	let rarityAndLevel;
	let rarity: number;
	let level: number;

	const getImageSrc = ({ type, rarity }) => {
		return `/images/icons/imgArtifact_${type}_${rarity}.png`;
	};

	console.log('aqui');
	const rarityColors = {
		common: 'cardBorderDefault',
		uncommon: 'cardBoarderTierUncommon',
		rare: 'cardBoarderTierRare',
		epic: 'cardBoarderTierEpic',
		legendary: 'cardBoarderTierLegendary',
		mythic: 'cardBoarderTierMythic',
	} as const;

	const getCardBorderColor = (rarity) => {
		return rarityColors[rarity] ?? 'cardBorderDefault';
	};

	$: level = getLevelFromGrade(artifactData.grade);
	$: rarity = getRarityFromGrade(artifactData.grade);

	$: rarityAndLevel = convertGradeToRarityAndLevel(artifactData.grade);
</script>

{#if rarity && level}
	<CardBorder
		borderColor={getCardBorderColor(rarity)}
		background={getCardBorderColor(rarity)}
		{width}
		{level}
		rarity={returnRarityName(rarity).toLowerCase()}
	>
		<div class={styles.wrapper}>
			<img
				loading="lazy"
				class={styles.img}
				src={getImageSrc({ type: artifactData.type, rarity })}
				alt="Artifact slot"
			/>
		</div>
	</CardBorder>
{/if}
