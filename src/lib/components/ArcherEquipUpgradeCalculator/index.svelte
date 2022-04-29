<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { archerPromoteProgressionByGrade } from '$lib/db/archer';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Grades } from '$lib/types';

  import * as styles from './index.css';

  let selectedStartLevel: Grades = 1 as Grades;
  let selectedEndLevel: Grades = 2 as Grades;
  let steelCost = 0;

  function calculateCost(startLevel, endLevel) {
    steelCost = 0;

    if (startLevel >= endLevel) return;
    for (let level = startLevel; level < endLevel; level++) {
      steelCost += archerPromoteProgressionByGrade[level].iron;
    }
  }

  $: calculateCost(selectedStartLevel, selectedEndLevel);
</script>

<div class={styles.container}>
  <div
    class={sprinkles({
      display: 'flex',
      flexDirection: {
        sm: 'column',
        ['2xl']: 'row',
      },
      justifyContent: 'center',
      alignItems: 'center',
      gap: {
        sm: 6,
        ['2xl']: 10,
      },
    })}
  >
    <div class={styles.innerContainer}>
      <Text textAlign="center">From</Text>
      <InputGrade bind:grade={selectedStartLevel} />
    </div>
    <div class={styles.innerContainer}>
      <Text textAlign="center">To</Text>
      <InputGrade bind:grade={selectedEndLevel} />
    </div>
  </div>
  <div class={styles.result}>
    <div class={styles.ascensionStoneResult}>
      <Card cardType="steel" value={steelCost} />
    </div>
  </div>
</div>
