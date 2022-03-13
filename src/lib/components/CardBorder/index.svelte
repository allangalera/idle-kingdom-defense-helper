<script lang="ts">
	import { sprinkles, type Sprinkles } from '$lib/styles/sprinkles.css';

	import * as styles from './index.css';

	export let borderColor: Sprinkles['background'] = 'cardBorderDefault';
	export let background: Sprinkles['background'] = 'cardBackgroundDefault';
	export let width: Sprinkles['width'] = 24;
	export let heroType: HeroType = null;
	export let ranking: {
		level: UpgradeLevel;
		rarity: Rarity;
	} = null;

	const gearRarity = {
		common: 1,
		uncommon: 2,
		rare: 3,
		epic: 4,
		legendary: 5,
		mythic: 6,
	};

	const rankingLevels = ranking && new Array(ranking.level);
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
					<slot />
				</div>
			</div>
		</div>
	</div>
	{#if heroType}
		<div class={styles.heroTypeBadge}>
			<img
				class={styles.badge}
				src={`images/heroType/iconClassSupporterRound.png`}
				alt="ranking icon"
			/>
		</div>
	{/if}
	{#if ranking}
		<div class={styles.ranking}>
			{#each rankingLevels as level}
				<img
					class={styles.star}
					src={`images/ranking/iconStarSmall${gearRarity[ranking.rarity]}.png`}
					alt="ranking icon"
				/>
			{/each}
		</div>
	{/if}
</div>
