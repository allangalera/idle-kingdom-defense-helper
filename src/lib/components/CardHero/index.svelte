<script lang="ts">
	import * as styles from './index.css';

	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import { UnitTypeToHeroType } from '$lib/enums';
	import type { Sprinkles } from '$lib/styles/sprinkles.css';
	import { convertGradeToStarLevel } from '$lib/utils';
	export let width: Sprinkles['width'] = 24;
	export let heroTypeBadgeWidth: Sprinkles['width'] = 6;
	export let hero;

	let heroGrade = convertGradeToStarLevel(hero.grade || hero.baseGrade);

	$: heroGrade = convertGradeToStarLevel(hero.grade || hero.baseGrade);
</script>

<CardBorder
	{width}
	{heroTypeBadgeWidth}
	heroType={UnitTypeToHeroType[hero.unitType]}
	rarity={heroGrade.rarity}
	level={heroGrade.level}
>
	<div class={styles.wrapper}>
		<img class={styles.img} src={`images/heroes/${hero.name}.png`} alt="Helmet Gear" />
	</div></CardBorder
>
