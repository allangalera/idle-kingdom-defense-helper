<script lang="ts">
	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import type { Sprinkles } from '$lib/styles/sprinkles.css';
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import { convertGradeToStarLevel } from '$lib/utils';
	import * as styles from './index.css';
	import { match } from 'oxide.ts';

	export let value: number | null = null;
	export let grade: number = null;
	export let width: Sprinkles['width'] = 24;

	let valueSize = match(width, [[(n) => n < 20, 'sm' as const], () => 'xl' as const]);
	let shardSize = match(width, [
		[(n) => n <= 10, 2 as const],
		[(n) => n < 20, 3 as const],
		() => 4 as const
	]);
	let heroGrade;

	let conditionalAttributes = {};

	$: heroGrade = convertGradeToStarLevel(grade ?? 1);
	$: conditionalAttributes = grade ? heroGrade : {};
</script>

<CardBorder {width} {...conditionalAttributes}>
	<div class={styles.container}>
		<img
			loading="lazy"
			class={styles.background}
			src="/images/rarity/bgRarity1.png"
			alt="Shard Card Background"
		/>
		<div class={styles.question}>
			<img
				loading="lazy"
				class={[
					sprinkles({
						size: 'full'
					})
				].join(' ')}
				src={`/images/plist/sprHeroRandom0${grade ?? 1}.png`}
				alt="Icon Piece Shard"
			/>
		</div>
		<img
			loading="lazy"
			class={[
				styles.iconShard,
				sprinkles({
					width: shardSize
				})
			].join(' ')}
			src="/images/icons/iconPiece.png"
			alt="Icon Piece Shard"
		/>
		{#if value}
			<div class={styles.counter}>
				<Text color="white" fontSize={valueSize}>x{value}</Text>
			</div>
		{/if}
	</div>
</CardBorder>
