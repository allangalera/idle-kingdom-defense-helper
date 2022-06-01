<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import CardHeroShard from '$lib/components/CardHeroShard/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Grades } from '$lib/types';
  import { calculateAscendCost } from '$lib/utils/hero';

  import * as styles from './index.css';

  let selectedStartGrade: Grades = 1 as Grades;
  let selectedEndGrade: Grades = 2 as Grades;

  let shardsCost = 0;
  let ascensionStonesCost = 0;

  const updateCalculation = () => {
    const result = calculateAscendCost(selectedStartGrade, selectedEndGrade);
    shardsCost = result.shards;
    ascensionStonesCost = result.ascensionStones;
  };

  $: (selectedStartGrade || selectedEndGrade) && updateCalculation();
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
      <InputGrade bind:grade={selectedStartGrade} />
    </div>
    <div class={styles.innerContainer}>
      <Text textAlign="center">To</Text>
      <InputGrade bind:grade={selectedEndGrade} />
    </div>
  </div>
  <div class={styles.result}>
    <div class={styles.shardResult}>
      <CardHeroShard value={shardsCost} />
    </div>
    <div class={styles.ascensionStoneResult}>
      <Card cardType="ascension-stone" value={ascensionStonesCost} />
    </div>
  </div>
</div>
