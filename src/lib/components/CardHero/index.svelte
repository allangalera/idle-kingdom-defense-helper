<script lang="ts">
	import * as styles from './index.css';

	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import { UnitTypeToHeroType } from '$lib/enums';
	export let hero;
</script>

<CardBorder heroType={UnitTypeToHeroType[hero.unitType]} rarity={'common'} level={hero.baseGrade}>
	<div class={styles.wrapper}>
		<img class={styles.img} src={`images/heroes/${hero.name}.png`} alt="Helmet Gear" />
	</div></CardBorder
>
