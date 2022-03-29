<script lang="ts">
	import * as styles from './index.css';

	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import type { Sprinkles } from '$lib/styles/sprinkles.css';
	import type { CardGearType } from '$lib/types';

	export let gearType: CardGearType;
	export let width: Sprinkles['width'] = 24;

	const gearOptions = {
		hero: 'hgear',
		archer: 'sprGear',
		blueprint: 'sprRecipe',
	};

	const heroGearEquip = {
		all: 0,
		weapon: 1,
		helmet: 2,
		chest: 3,
		boots: 4,
	};

	const archerGearEquip = {
		bow: 1,
		arrow: 2,
		helmet: 3,
		chest: 4,
		gloves: 5,
		boots: 6,
	};

	const blueprintGearEquip = {
		all: 0,
		bow: 1,
		arrow: 2,
		helmet: 3,
		chest: 4,
		gloves: 5,
		boots: 6,
	};

	const gearRarity = {
		common: 1,
		uncommon: 2,
		rare: 3,
		epic: 4,
		legendary: 5,
		mythic: 6,
	};

	const rarityColors = {
		common: 'cardBorderDefault',
		uncommon: 'cardBoarderTierUncommon',
		rare: 'cardBoarderTierRare',
		epic: 'cardBoarderTierEpic',
		legendary: 'cardBoarderTierLegendary',
		mythic: 'cardBoarderTierMythic',
	} as const;

	function getCardBorderColor(gearType: CardGearType) {
		if (['archer'].includes(gearType.type)) {
			return rarityColors.common;
		}

		return rarityColors[gearType.rarity];
	}

	function getGearImagePath(gearType: CardGearType) {
		const { type, equip, rarity } = gearType;
		if (type === 'hero') {
			return `images/gear/${gearOptions[type]}_${heroGearEquip[equip]}${gearRarity[rarity]}.png`;
		} else if (type === 'blueprint') {
			return `images/blueprint/${gearOptions[type]}${gearRarity[rarity]}${blueprintGearEquip[equip]}.png`;
		}

		return `images/gear/${gearOptions[type]}${gearRarity[rarity]}${archerGearEquip[equip]}.png`;
	}
</script>

<CardBorder
	borderColor={getCardBorderColor(gearType)}
	background={getCardBorderColor(gearType)}
	{width}
	level={gearType.level}
	rarity={gearType.rarity}
>
	<div class={styles.wrapper}>
		<img loading="lazy" class={styles.img} src={getGearImagePath(gearType)} alt="Helmet Gear" />
	</div>
</CardBorder>
