<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import { CASTLE_MAX_LEVEL } from '$lib/constants';
  import { calculateCastleUpgradeCost } from '$lib/utils/castle-gold';

  import * as styles from './index.css';

  let currentLevel = '1';
  let targetLevel = '2';
  let goldNeeded = 0;

  $: goldNeeded = calculateCastleUpgradeCost({
    currentLevel: +currentLevel,
    targetLevel: +targetLevel,
  });
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
