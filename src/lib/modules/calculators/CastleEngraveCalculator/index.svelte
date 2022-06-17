<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { castleConst } from '$lib/db/castle';
  import {
    calculatorsInformationStore,
    updateCalculatorInformation,
  } from '$lib/shared/stores/user/calculatorsInformation';
  import { calculateCasteEngraving } from '$lib/utils/castle';

  import * as styles from './index.css';

  const CALCULATOR_STORE_KEY = 'CASTLE_ENGRAVE_CALCULATOR';

  let currentLevel = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.currentLevel ?? '0';
  let targetLevel = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.targetLevel ?? '1';
  let result = {
    def: 0,
    coin: {
      min: 0,
      avg: 0,
      max: 0,
    },
    cash: {
      min: 0,
      avg: 0,
      max: 0,
    },
  };

  const updateCost = () => {
    result = calculateCasteEngraving(Number(currentLevel), Number(targetLevel));
  };

  const updateStore = () => {
    updateCalculatorInformation(CALCULATOR_STORE_KEY, {
      currentLevel,
      targetLevel,
    });
  };

  $: (currentLevel || targetLevel) && updateCost();
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
      max: castleConst.ENGRAVE.MAX_LV - 1,
    }}
  />
  <Input
    textAlign="center"
    label="Target Level"
    bind:value={targetLevel}
    maskOptions={{
      mask: Number,
      min: 0,
      max: castleConst.ENGRAVE.MAX_LV,
    }}
  />
  <div class={styles.result}>
    <Card cardType="def" value={result.def} decimalNumbers={2} />
  </div>
  <div class={styles.result}>
    <div>
      <Text textAlign="center">Min</Text>
      <Card cardType="ancient-coin" value={result.coin.max} decimalNumbers={2} />
    </div>
    <div>
      <Text textAlign="center">Avg</Text>
      <Card cardType="ancient-coin" value={result.coin.avg} decimalNumbers={2} />
    </div>
    <div>
      <Text textAlign="center">Max</Text>
      <Card cardType="ancient-coin" value={result.coin.min} decimalNumbers={2} />
    </div>
  </div>
  <div class={styles.result}>
    <div>
      <Text textAlign="center">Min</Text>
      <Card cardType="ruby" value={result.cash.max} decimalNumbers={2} />
    </div>
    <div>
      <Text textAlign="center">Avg</Text>
      <Card cardType="ruby" value={result.cash.avg} decimalNumbers={2} />
    </div>
    <div>
      <Text textAlign="center">Max</Text>
      <Card cardType="ruby" value={result.cash.min} decimalNumbers={2} />
    </div>
  </div>
</div>
