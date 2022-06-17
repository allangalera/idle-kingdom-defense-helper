<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import ArcherBlueprint from '$lib/modules/InformationAndRequirements/ArcherBlueprint/index.svelte';
  import ArcherPromote from '$lib/modules/InformationAndRequirements/ArcherPromote/index.svelte';
  import ArcherQualityPropertyCraftRates from '$lib/modules/InformationAndRequirements/ArcherQualityPropertyCraftRates/index.svelte';
  import BerserkMode from '$lib/modules/InformationAndRequirements/BerserkMode/index.svelte';
  import EnemyCCResist from '$lib/modules/InformationAndRequirements/EnemyCCResist/index.svelte';
  import HeroGear from '$lib/modules/InformationAndRequirements/HeroGear/index.svelte';
  import Runes from '$lib/modules/InformationAndRequirements/Runes/index.svelte';
  import SanctuaryRunes from '$lib/modules/InformationAndRequirements/SanctuaryRunes/index.svelte';
  import UltraSummonGear from '$lib/modules/InformationAndRequirements/UltraSummonGear/index.svelte';

  import * as styles from './index.css';
</script>

<Heading textAlign="center" fontSize="3xl">Information and Requirements</Heading>
<div class={styles.grid}>
  <ArcherBlueprint />
  <ArcherPromote />
  <HeroGear />
  <EnemyCCResist />
  <UltraSummonGear />
  <SanctuaryRunes />
  <Runes />
  <ArcherQualityPropertyCraftRates />
  <BerserkMode />
</div>
