<script>
	import * as styles from './index.css';
	import GridItem from '$lib/components/GridItem/index.svelte';
	import CastleGoldUpgradeCostCalculator from '$lib/components/CastleGoldUpgradeCostCalculator/index.svelte';
	import HeroUpgradeCostCalculator from '$lib/components/HeroUpgradeCostCalculator/index.svelte';
</script>

<div class={styles.grid}>
	<GridItem title="Castle Gold Upgrade Cost Calculator">
		<CastleGoldUpgradeCostCalculator />
	</GridItem>
	<GridItem title="Hero Upgrade Cost Calculator">
		<HeroUpgradeCostCalculator />
	</GridItem>
</div>
