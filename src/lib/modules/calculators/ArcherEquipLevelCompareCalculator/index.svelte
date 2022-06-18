<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import InputTier from '$lib/components/InputTier/index.svelte';
  import SelectArcherEquip from '$lib/components/SelectArcherEquip/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { ArcherGearEquip } from '$lib/enums';
  import {
    calculatorsInformationStore,
    updateCalculatorInformation,
  } from '$lib/shared/stores/user/calculatorsInformation';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { getEquipData } from '$lib/utils/archer';

  import * as styles from './index.css';

  const CALCULATOR_STORE_KEY = 'ARCHER_EQUIP_LEVEL_COMPARE_CALCULATOR';

  let selectedEquip: keyof typeof ArcherGearEquip =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.selectedEquip ?? ArcherGearEquip.bow;
  let selectedTierStart =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.selectedTierStart ?? '0';
  let selectedTierEnd =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.selectedTierEnd ?? '0';
  let selectedStartLevel: number =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.selectedStartLevel ?? 1;
  let startEnhanceLevel =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.startEnhanceLevel ?? '0';
  let endEnhanceLevel =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.endEnhanceLevel ?? '0';
  let selectedEndLevel: number =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.selectedEndLevel ?? 2;

  let fromEquip;
  let toEquip;

  let fromStats;
  let toStats;

  const onEquipsUpdate = () => {
    if (
      selectedStartLevel === selectedEndLevel &&
      +startEnhanceLevel === +endEnhanceLevel &&
      selectedTierStart === selectedTierEnd
    ) {
      fromEquip = null;
      toEquip = null;
      return;
    }
    fromEquip = getEquipData(selectedEquip, selectedStartLevel, +selectedTierStart);
    toEquip = getEquipData(selectedEquip, selectedEndLevel, +selectedTierEnd);
  };

  const calculateStats = () => {
    if (!fromEquip || !toEquip) {
      fromStats = null;
      toStats = null;
      return;
    }

    fromStats = {
      statType: fromEquip.statInitValue + fromEquip.statIncValue * Number(startEnhanceLevel),
      statSub:
        fromEquip.statSubName === 'Attack Speed'
          ? `${Math.floor(fromEquip.subInitValue * 100)}%`
          : fromEquip.subInitValue,
    };
    toStats = {
      statType: toEquip.statInitValue + toEquip.statIncValue * Number(endEnhanceLevel),
      statSub:
        toEquip.statSubName === 'Attack Speed'
          ? `${Math.floor(toEquip.subInitValue * 100)}%`
          : toEquip.subInitValue,
    };
  };

  const updateStore = () => {
    updateCalculatorInformation(CALCULATOR_STORE_KEY, {
      selectedStartLevel,
      selectedEndLevel,
      selectedEquip,
      startEnhanceLevel,
      endEnhanceLevel,
      selectedTierStart,
      selectedTierEnd,
    });
  };

  $: (selectedStartLevel ||
    selectedEndLevel ||
    selectedEquip ||
    startEnhanceLevel ||
    endEnhanceLevel ||
    selectedTierStart ||
    selectedTierEnd) &&
    onEquipsUpdate();

  $: (selectedStartLevel ||
    selectedEndLevel ||
    selectedEquip ||
    startEnhanceLevel ||
    endEnhanceLevel ||
    selectedTierStart ||
    selectedTierEnd) &&
    updateStore();

  $: (fromEquip || toEquip) && calculateStats();
</script>

<div class={styles.container}>
  <div class={styles.equipContainer}>
    <SelectArcherEquip bind:value={selectedEquip} />
  </div>
  <div
    class={sprinkles({
      display: 'flex',
      flexDirection: {
        sm: 'column',
        md: 'row',
      },
      justifyContent: 'center',
      alignItems: 'center',
      gap: {
        sm: 6,
        md: 10,
      },
    })}
  >
    <div class={styles.innerContainer}>
      <Text textAlign="center">From</Text>
      <div class={styles.equipContainer}>
        <InputTier bind:value={selectedTierStart} />
      </div>
      <InputGrade bind:grade={selectedStartLevel} />
      <Input
        textAlign="center"
        label="Enhance Level"
        bind:value={startEnhanceLevel}
        maskOptions={{
          mask: Number,
          min: 0,
        }}
      />
    </div>
    <div class={styles.innerContainer}>
      <Text textAlign="center">To</Text>
      <div class={styles.equipContainer}>
        <InputTier bind:value={selectedTierEnd} />
      </div>
      <InputGrade bind:grade={selectedEndLevel} />
      <Input
        textAlign="center"
        label="Enhance Level"
        bind:value={endEnhanceLevel}
        maskOptions={{
          mask: Number,
          min: 0,
        }}
      />
    </div>
  </div>
</div>
<div
  class={sprinkles({
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  })}
>
  <Heading textAlign="center">Results</Heading>
  <div
    class={sprinkles({
      display: 'flex',
      flexDirection: {
        sm: 'column',
        md: 'row',
      },
      justifyContent: 'center',
      alignItems: 'center',
      gap: {
        sm: 6,
        md: 10,
      },
    })}
  >
    <div class={styles.innerContainer}>
      <Text textAlign="center">From</Text>
      {#if fromEquip && fromStats}
        <Text textAlign="center">{fromEquip.statTypeName}: {fromStats.statType}</Text>
        <Text textAlign="center">{fromEquip.statSubName}: {fromStats.statSub}</Text>
      {/if}
    </div>
    <div class={styles.innerContainer}>
      <Text textAlign="center">To</Text>
      {#if toEquip && toStats}
        <Text textAlign="center">{toEquip.statTypeName}: {toStats.statType}</Text>
        <Text textAlign="center">{toEquip.statSubName}: {toStats.statSub}</Text>
      {/if}
    </div>
  </div>
</div>
