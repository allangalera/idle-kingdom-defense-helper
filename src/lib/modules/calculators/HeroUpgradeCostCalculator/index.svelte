<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import { MAX_HERO_LEVEL } from '$lib/db/heroes';
  import {
    calculatorsInformationStore,
    updateCalculatorInformation,
  } from '$lib/shared/stores/user/calculatorsInformation';
  import { calculateLevelUpCost } from '$lib/utils/hero';

  import * as styles from './index.css';

  const CALCULATOR_STORE_KEY = 'HERO_UPGRADE_COST_CALCULATOR';

  let multiplier = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.multiplier ?? '1';
  let currentLevel = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.currentLevel ?? '1';
  let targetLevel = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.targetLevel ?? '2';
  let result = {
    coins: 0,
    souls: 0,
  };

  const updateStore = () => {
    updateCalculatorInformation(CALCULATOR_STORE_KEY, {
      multiplier,
      currentLevel,
      targetLevel,
    });
  };

  const update = () => {
    updateStore();
    const partialResult = calculateLevelUpCost(+currentLevel, +targetLevel);

    result = {
      coins: partialResult.coins * (+multiplier ?? 1),
      souls: partialResult.souls * (+multiplier ?? 1),
    };
  };

  $: (currentLevel || targetLevel || multiplier) && update();
</script>

<div class={styles.container}>
  <Input
    textAlign="center"
    label="Multiplier"
    bind:value={multiplier}
    maskOptions={{
      mask: Number,
      min: 1,
    }}
  />
  <Input
    textAlign="center"
    label="Current Level"
    bind:value={currentLevel}
    maskOptions={{
      mask: Number,
      min: 0,
      max: MAX_HERO_LEVEL - 1,
    }}
  />
  <Input
    textAlign="center"
    label="Target Level"
    bind:value={targetLevel}
    maskOptions={{
      mask: Number,
      min: 0,
      max: MAX_HERO_LEVEL,
    }}
  />
  <div class={styles.result}>
    <div class={styles.goldResult}>
      <Card cardType="coin" value={result.coins} decimalNumbers={2} />
    </div>
    <div class={styles.soulResult}>
      <Card cardType="soulstone" value={result.souls} decimalNumbers={2} />
    </div>
  </div>
</div>
