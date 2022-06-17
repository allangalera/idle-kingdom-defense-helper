<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import { CASTLE_MAX_LEVEL } from '$lib/constants';
  import {
    calculatorsInformationStore,
    updateCalculatorInformation,
  } from '$lib/shared/stores/user/calculatorsInformation';
  import { calculateCastleUpgradeCost } from '$lib/utils/castle-gold';

  import * as styles from './index.css';

  const CALCULATOR_STORE_KEY = 'CASTLE_GOLD_UPGRADE_COST_CALCULATOR';

  let currentLevel = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.currentLevel ?? '1';
  let targetLevel = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.targetLevel ?? '2';
  let goldNeeded = 0;

  const updateStore = () => {
    updateCalculatorInformation(CALCULATOR_STORE_KEY, {
      currentLevel,
      targetLevel,
    });
  };

  $: goldNeeded = calculateCastleUpgradeCost({
    currentLevel: +currentLevel,
    targetLevel: +targetLevel,
  });
  $: (currentLevel || targetLevel) && updateStore();
</script>

<div class={styles.container}>
  <Input
    textAlign="center"
    label="Current Level"
    bind:value={currentLevel}
    maskOptions={{
      mask: Number,
      min: 0,
      max: CASTLE_MAX_LEVEL - 1,
    }}
  />
  <Input
    textAlign="center"
    label="Target Level"
    bind:value={targetLevel}
    maskOptions={{
      mask: Number,
      min: 0,
      max: CASTLE_MAX_LEVEL,
    }}
  />
  <div class={styles.result}>
    <Card cardType="coin" value={goldNeeded} decimalNumbers={2} />
  </div>
</div>
