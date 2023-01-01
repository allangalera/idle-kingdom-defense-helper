<script lang="ts">
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import type { Sprinkles } from '$lib/styles/sprinkles.css';
	import type { HeroType, Rarity, UpgradeLevel } from '$lib/types';
	import { HeroTypes } from '$lib/types/enums';
	import * as styles from './index.css';

	export let borderColor: Sprinkles['background'] = 'cardBorderDefault';
	export let background: Sprinkles['background'] = 'cardBackgroundDefault';
	export let borderWidth: Sprinkles['padding'] = 1;
	export let width: Sprinkles['width'] = 24;
	export let heroTypeBadgeWidth: Sprinkles['width'] = 6;
	export let heroType: HeroType = null;
	export let level: UpgradeLevel = null;
	export let rarity: Rarity = null;

	const gearRarity = {
		common: 1,
		uncommon: 2,
		rare: 3,
		epic: 4,
		legendary: 5,
		mythic: 6,
	};

	const heroTypeIcons = {
		[HeroTypes.support]: 'iconClassSupporterRound',
		[HeroTypes.warrior]: 'iconClassWarriorRound',
	};

	$: rankingLevels = level && new Array(level);

	$: heroTypeImage = heroTypeIcons[heroType];
</script>

<div
	class={[
		styles.wrapper,
		sprinkles({
			width,
		}),
	].join(' ')}
>
	<div class={styles.outerBorder}>
		<div
			class={[
				styles.border,
				sprinkles({
					background: borderColor,
					padding: borderWidth,
				}),
			].join(' ')}
		>
			<div class={styles.innerBorder}>
				<div
					class={[
						styles.inner,
						sprinkles({
							background: background,
						}),
					].join(' ')}
				>
					{#if rarity}
						<img
							loading="lazy"
							class={styles.rarityBackground}
							src={`/images/rarity/bgRarity${gearRarity[rarity]}.png`}
							alt="Rarity"
						/>
					{/if}
					<slot />
				</div>
			</div>
		</div>
	</div>
	{#if heroType}
		<div class={styles.heroTypeBadge}>
			<img
				loading="lazy"
				class={sprinkles({
					width: heroTypeBadgeWidth,
				})}
				src={`/images/heroType/${heroTypeImage}.png`}
				alt="ranking icon"
			/>
		</div>
	{/if}
	{#if level && rarity}
		<div class={styles.ranking}>
			{#each rankingLevels as _}
				<img
					loading="lazy"
					class={styles.star}
					src={`/images/icons/iconStarBig${gearRarity[rarity]}.png`}
					alt="ranking icon"
				/>
			{/each}
		</div>
	{/if}
</div>
