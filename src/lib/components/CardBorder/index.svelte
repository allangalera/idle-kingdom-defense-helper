<script lang="ts">
	import { HeroTypes } from '$lib/enums';

	import { sprinkles, type Sprinkles } from '$lib/styles/sprinkles.css';

	import * as styles from './index.css';

	export let borderColor: Sprinkles['background'] = 'cardBorderDefault';
	export let background: Sprinkles['background'] = 'cardBackgroundDefault';
	export let width: Sprinkles['width'] = 24;
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
	$: rankingLevels = level && new Array(level);

	$: heroTypeImage =
		heroType === HeroTypes.support ? 'iconClassSupporterRound' : 'iconClassWarriorRound';
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
							class={styles.rarityBackground}
							src={`images/rarity/bgRarity${rarity}.png`}
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
			<img class={styles.badge} src={`images/heroType/${heroTypeImage}.png`} alt="ranking icon" />
		</div>
	{/if}
	{#if level && rarity}
		<div class={styles.ranking}>
			{#each rankingLevels as _}
				<img
					class={styles.star}
					src={`images/ranking/iconStarSmall${gearRarity[rarity]}.png`}
					alt="ranking icon"
				/>
			{/each}
		</div>
	{/if}
</div>
