<script>
  import * as styles from './index.css';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import CastleGoldUpgradeCostCalculator from '$lib/components/CastleGoldUpgradeCostCalculator/index.svelte';
  import HeroUpgradeCostCalculator from '$lib/components/HeroUpgradeCostCalculator/index.svelte';
  import HeroAscensionCalculator from '$lib/components/HeroAscensionCalculator/index.svelte';
  import FarmStageCalculator from '$lib/components/FarmStageCalculator/index.svelte';
  import ArcherEquipUpgradeCalculator from '$lib/components/ArcherEquipUpgradeCalculator/index.svelte';
  import ArcherEquipLevelCompareCalculator from '$lib/components/ArcherEquipLevelCompareCalculator/index.svelte';
  import StageFarmCompareCalculator from '$lib/components/StageFarmCompareCalculator/index.svelte';
</script>

<div class={styles.grid}>
  <GridItem title="Castle Upgrade Cost Calculator">
    <CastleGoldUpgradeCostCalculator />
  </GridItem>
  <GridItem title="Hero Upgrade Cost Calculator">
    <HeroUpgradeCostCalculator />
  </GridItem>
  <GridItem title="Hero Ascension Calculator">
    <HeroAscensionCalculator />
  </GridItem>
  <GridItem title="Archer Promote Cost Calculator">
    <ArcherEquipUpgradeCalculator />
  </GridItem>
  <GridItem title="Archer Equip Compare Calculator" full>
    <ArcherEquipLevelCompareCalculator />
  </GridItem>
  <GridItem title="Stage Farm Compare Calculator" full>
    <StageFarmCompareCalculator />
  </GridItem>
  <GridItem title="Stage to Farm Calculator" full>
    <FarmStageCalculator />
  </GridItem>
</div>
