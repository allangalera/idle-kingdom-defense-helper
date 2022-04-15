<script lang="ts">
  import * as styles from './index.css';
  import Input from '$lib/components/Input/index.svelte';
  import Card from '$lib/components/Card/index.svelte';
  import { calculateLevelUpCost } from '$lib/utils/hero';
  import { MAX_HERO_LEVEL } from '$lib/db/heroes';

  let currentLevel = '1';
  let targetLevel = '2';
  let result = {
    coins: 0,
    souls: 0,
  };

  $: result = calculateLevelUpCost(+currentLevel, +targetLevel);
</script>

<div class={styles.container}>
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
