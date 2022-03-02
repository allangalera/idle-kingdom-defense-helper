<script>
	import * as styles from './index.css';
	export let hero;
</script>

<div class={styles.outsideBorderVariant[hero.tier.name]}>
	<div class={styles.heroVariant[hero.tier.name]}>
		<div class={styles.heroContainerVariant[hero.tier.name]}>
			<div class={styles.heroImageContainer}>
				<img
					class={styles.heroClass}
					src={hero.class.image}
					alt={hero.class.name}
					title={hero.class.name}
				/>
				<img
					class={styles.heroType}
					src={hero.type.image}
					alt={hero.type.name}
					title={hero.type.name}
				/>
				<img
					class={styles.heroImage}
					src={`images/${hero.name}Clear.png`}
					alt={hero.name}
					title={hero.name}
				/>
			</div>
			<div class={styles.heroNameAndTier[hero.tier.name]}>
				<strong class={styles.heroName}>{hero.name}</strong>
				<img class={styles.tierBadge} src={hero.tier.image} alt="{hero.tier.name} badge" />
			</div>
		</div>
	</div>
</div>
