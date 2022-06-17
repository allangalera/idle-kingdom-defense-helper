<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import CardHeroShard from '$lib/components/CardHeroShard/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import {
    calculatorsInformationStore,
    updateCalculatorInformation,
  } from '$lib/shared/stores/user/calculatorsInformation';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { calculateAscendCost } from '$lib/utils/hero';

  import * as styles from './index.css';

  const CALCULATOR_STORE_KEY = 'HERO_ASCENSION_CALCULATOR';

  let selectedStartGrade =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.selectedStartGrade ?? 1;
  let selectedEndGrade =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.selectedEndGrade ?? 2;

  let shardsCost = 0;
  let ascensionStonesCost = 0;

  const updateCalculation = () => {
    const result = calculateAscendCost(selectedStartGrade, selectedEndGrade);
    shardsCost = result.shards;
    ascensionStonesCost = result.ascensionStones;
  };

  const updateStore = () => {
    updateCalculatorInformation(CALCULATOR_STORE_KEY, {
      selectedStartGrade,
      selectedEndGrade,
    });
  };

  $: (selectedStartGrade || selectedEndGrade) && updateCalculation();
  $: (selectedStartGrade || selectedEndGrade) && updateStore();
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
