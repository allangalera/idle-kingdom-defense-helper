<script>
	import * as styles from './index.css';
	import GridItem from '$lib/components/GridItem/index.svelte';
	import CastleGoldUpgradeCostCalculator from '$lib/components/CastleGoldUpgradeCostCalculator/index.svelte';
	import HeroUpgradeCostCalculator from '$lib/components/HeroUpgradeCostCalculator/index.svelte';
	import HeroAscensionCalculator from '$lib/components/HeroAscensionCalculator/index.svelte';
	import FarmStageCalculator from '$lib/components/FarmStageCalculator/index.svelte';
	import ArcherEquipUpgradeCalculator from '$lib/components/ArcherEquipUpgradeCalculator/index.svelte';
</script>

<div class={styles.grid}>
	<GridItem title="Castle Upgrade Cost Calculator">
		<CastleGoldUpgradeCostCalculator />
	</GridItem>
	<GridItem title="Hero Upgrade Cost Calculator">
		<HeroUpgradeCostCalculator />
	</GridItem>
	<GridItem title="Hero Ascension Calculator" full>
		<HeroAscensionCalculator />
	</GridItem>
	<GridItem title="Stage to Farm Calculator" full>
		<FarmStageCalculator />
	</GridItem>
	<GridItem title="Archer Upgrade Cost Calculator" full>
		<ArcherEquipUpgradeCalculator />
	</GridItem>
</div>
