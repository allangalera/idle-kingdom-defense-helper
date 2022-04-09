<script lang="ts">
  import * as styles from './index.css';
  import { heroGradeInfo } from '$lib/db/heroes';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Card from '$lib/components/Card/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import CardHeroShard from '$lib/components/CardHeroShard/index.svelte';
  import type { Grades } from '$lib/types';
  import { sprinkles } from '$lib/styles/sprinkles.css';

  let selectedStartGrade: Grades = 1 as Grades;
  let selectedEndGrade: Grades = 2 as Grades;

  let shardsCost = 0;
  let ascensionStonesCost = 0;

  function calculateCost(startGrade, endGrade) {
    shardsCost = 0;
    ascensionStonesCost = 0;

    if (startGrade === endGrade) return;

    for (const gradeInfo of heroGradeInfo) {
      if (gradeInfo.id > startGrade && gradeInfo.id <= endGrade) {
        shardsCost += gradeInfo.evolvePiece;
        ascensionStonesCost += gradeInfo.stone;
      }
    }
  }

  $: calculateCost(selectedStartGrade, selectedEndGrade);
</script>

<div class={styles.container}>
  <div
    class={sprinkles({
      display: 'flex',
      flexDirection: {
        sm: 'column',
        xl: 'row',
      },
      justifyContent: 'center',
      alignItems: 'center',
      gap: {
        sm: 6,
        xl: 10,
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
