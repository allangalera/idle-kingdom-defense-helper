<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { MAX_CASTLE_ENGRAVE_LEVEL } from '$lib/db/castle';
  import { calculateCasteEngraving } from '$lib/utils/castle';

  import * as styles from './index.css';

  let currentLevel = '0';
  let targetLevel = '1';
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

  $: (currentLevel || targetLevel) && updateCost();
</script>

<div class={styles.container}>
  <Input
    textAlign="center"
    label="Current Level"
    bind:value={currentLevel}
    maskOptions={{
      mask: Number,
      min: 0,
      max: MAX_CASTLE_ENGRAVE_LEVEL - 1,
    }}
  />
  <Input
    textAlign="center"
    label="Target Level"
    bind:value={targetLevel}
    maskOptions={{
      mask: Number,
      min: 0,
      max: MAX_CASTLE_ENGRAVE_LEVEL,
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
