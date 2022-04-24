<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { ArcherGearEquip } from '$lib/enums';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Grades } from '$lib/types';
  import { getEquipData } from '$lib/utils/archer';

  import * as styles from './index.css';

  let selectedEquip: ArcherGearEquip = ArcherGearEquip.bow;
  let selectedTierStart = '0';
  let selectedTierEnd = '0';
  let selectedStartLevel: Grades = 1;
  let startEnhanceLevel = '0';
  let endEnhanceLevel = '0';
  let selectedEndLevel: Grades = 2;

  let fromEquip;
  let toEquip;

  let fromStats;
  let toStats;

  const onEquipSelectChange = (event) => {
    const { value } = event.target;
    selectedEquip = value;
  };

  const onTierStartSelectionChange = (event) => {
    const { value } = event.target;
    selectedTierStart = value;
  };

  const onTierEndSelectionChange = (event) => {
    const { value } = event.target;
    selectedTierEnd = value;
  };

  const onEquipsUpdate = () => {
    if (selectedStartLevel === selectedEndLevel && startEnhanceLevel === endEnhanceLevel) return;
    fromEquip = getEquipData(selectedEquip, selectedStartLevel, +selectedTierStart);
    toEquip = getEquipData(selectedEquip, selectedEndLevel, +selectedTierEnd);
  };

  const calculateStats = () => {
    if (!fromEquip && !toEquip) {
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

  $: selectedStartLevel &&
    selectedEndLevel &&
    selectedEquip &&
    startEnhanceLevel &&
    endEnhanceLevel &&
    selectedTierStart &&
    selectedTierEnd &&
    onEquipsUpdate();

  $: fromEquip && toEquip && calculateStats();
</script>

<div class={styles.container}>
  <div class={styles.equipContainer}>
    <label class={styles.radioEquipContainer}>
      <Text>Bow</Text>
      <input
        type="radio"
        name="equipSelection"
        value={ArcherGearEquip.bow}
        checked={selectedEquip === ArcherGearEquip.bow}
        on:change={onEquipSelectChange}
      />
    </label>
    <label class={styles.radioEquipContainer}>
      <Text>Arrow</Text>
      <input
        type="radio"
        name="equipSelection"
        value={ArcherGearEquip.arrow}
        checked={selectedEquip === ArcherGearEquip.arrow}
        on:change={onEquipSelectChange}
      />
    </label>
    <label class={styles.radioEquipContainer}>
      <Text>Helmet</Text>
      <input
        type="radio"
        name="equipSelection"
        value={ArcherGearEquip.helmet}
        checked={selectedEquip === ArcherGearEquip.helmet}
        on:change={onEquipSelectChange}
      />
    </label>
    <label class={styles.radioEquipContainer}>
      <Text>Chest</Text>
      <input
        type="radio"
        name="equipSelection"
        value={ArcherGearEquip.chest}
        checked={selectedEquip === ArcherGearEquip.chest}
        on:change={onEquipSelectChange}
      />
    </label>
    <label class={styles.radioEquipContainer}>
      <Text>Gloves</Text>
      <input
        type="radio"
        name="equipSelection"
        value={ArcherGearEquip.gloves}
        checked={selectedEquip === ArcherGearEquip.gloves}
        on:change={onEquipSelectChange}
      />
    </label>
    <label class={styles.radioEquipContainer}>
      <Text>Boots</Text>
      <input
        type="radio"
        name="equipSelection"
        value={ArcherGearEquip.boots}
        checked={selectedEquip === ArcherGearEquip.boots}
        on:change={onEquipSelectChange}
      />
    </label>
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
        <label class={styles.radioTierContainer}>
          <img
            class={styles.tierIcon}
            src="images/heroTier/iconGearQuality1.png"
            alt="Tier C icon"
          />
          <input
            type="radio"
            name="tierStart"
            value="0"
            checked={selectedTierStart === '0'}
            on:change={onTierStartSelectionChange}
          />
        </label>
        <label class={styles.radioTierContainer}>
          <img
            class={styles.tierIcon}
            src="images/heroTier/iconGearQuality2.png"
            alt="Tier B icon"
          />
          <input
            type="radio"
            name="tierStart"
            value="1"
            checked={selectedTierStart === '1'}
            on:change={onTierStartSelectionChange}
          />
        </label>
        <label class={styles.radioTierContainer}>
          <img
            class={styles.tierIcon}
            src="images/heroTier/iconGearQuality3.png"
            alt="Tier A icon"
          />
          <input
            type="radio"
            name="tierStart"
            value="2"
            checked={selectedTierStart === '2'}
            on:change={onTierStartSelectionChange}
          />
        </label>
        <label class={styles.radioTierContainer}>
          <img
            class={styles.tierIcon}
            src="images/heroTier/iconGearQuality4.png"
            alt="Tier S icon"
          />
          <input
            type="radio"
            name="tierStart"
            value="3"
            checked={selectedTierStart === '3'}
            on:change={onTierStartSelectionChange}
          />
        </label>
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
        <label class={styles.radioTierContainer}>
          <img
            class={styles.tierIcon}
            src="images/heroTier/iconGearQuality1.png"
            alt="Tier C icon"
          />
          <input
            type="radio"
            name="tierEnd"
            value={'0'}
            checked={selectedTierEnd === '0'}
            on:change={onTierEndSelectionChange}
          />
        </label>
        <label class={styles.radioTierContainer}>
          <img
            class={styles.tierIcon}
            src="images/heroTier/iconGearQuality2.png"
            alt="Tier B icon"
          />
          <input
            type="radio"
            name="tierEnd"
            value={'1'}
            checked={selectedTierEnd === '1'}
            on:change={onTierEndSelectionChange}
          />
        </label>
        <label class={styles.radioTierContainer}>
          <img
            class={styles.tierIcon}
            src="images/heroTier/iconGearQuality3.png"
            alt="Tier A icon"
          />
          <input
            type="radio"
            name="tierEnd"
            value={'2'}
            checked={selectedTierEnd === '2'}
            on:change={onTierEndSelectionChange}
          />
        </label>
        <label class={styles.radioTierContainer}>
          <img
            class={styles.tierIcon}
            src="images/heroTier/iconGearQuality4.png"
            alt="Tier S icon"
          />
          <input
            type="radio"
            name="tierEnd"
            value={'3'}
            checked={selectedTierEnd === '3'}
            on:change={onTierEndSelectionChange}
          />
        </label>
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
      {#if fromStats}
        <Text textAlign="center">{fromEquip.statTypeName}: {fromStats.statType}</Text>
        <Text textAlign="center">{fromEquip.statSubName}: {fromStats.statSub}</Text>
      {/if}
    </div>
    <div class={styles.innerContainer}>
      <Text textAlign="center">To</Text>
      {#if toStats}
        <Text textAlign="center">{toEquip.statTypeName}: {toStats.statType}</Text>
        <Text textAlign="center">{toEquip.statSubName}: {toStats.statSub}</Text>
      {/if}
    </div>
  </div>
</div>
