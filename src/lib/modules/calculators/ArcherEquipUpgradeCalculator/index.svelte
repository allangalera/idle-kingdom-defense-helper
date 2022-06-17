<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { archerPromoteProgressionByGrade } from '$lib/db/archer';
  import {
    calculatorsInformationStore,
    updateCalculatorInformation,
  } from '$lib/shared/stores/user/calculatorsInformation';
  import { sprinkles } from '$lib/styles/sprinkles.css';

  import * as styles from './index.css';

  const CALCULATOR_STORE_KEY = 'ARCHER_EQUIP_UPGRADE_CALCULATOR';

  let selectedStartLevel =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.selectedStartLevel ?? 1;
  let selectedEndLevel =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.selectedEndLevel ?? 2;
  let steelCost = 0;

  const calculateCost = () => {
    steelCost = 0;

    if (selectedStartLevel >= selectedEndLevel) return;
    for (let level = selectedStartLevel; level < selectedEndLevel; level++) {
      steelCost += archerPromoteProgressionByGrade[level].iron;
    }
  };

  const updateStore = () => {
    updateCalculatorInformation(CALCULATOR_STORE_KEY, {
      selectedStartLevel,
      selectedEndLevel,
    });
  };

  $: (selectedStartLevel || selectedEndLevel) && calculateCost();
  $: (selectedStartLevel || selectedEndLevel) && updateStore();
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
