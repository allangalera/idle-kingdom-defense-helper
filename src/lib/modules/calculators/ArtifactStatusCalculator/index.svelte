<script lang="ts">
  import Input from '$lib/components/Input/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Select from '$lib/components/Select/index.svelte';
  import SelectButtons from '$lib/components/SelectButtons/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { abilitiesIdsAllowed, artifacts } from '$lib/db/artifacts';
  import {
    calculatorsInformationStore,
    updateCalculatorInformation,
  } from '$lib/shared/stores/user/calculatorsInformation';
  import * as tableStyles from '$lib/styles/table.css';
  import { getRowStyling } from '$lib/styles/utils';
  import { returnAbilityName } from '$lib/utils/abilities';
  import type { Abilities } from '$lib/utils/abilities';
  import { calculateArtifactStats } from '$lib/utils/artifacts';

  import * as styles from './index.css';

  const CALCULATOR_STORE_KEY = 'ARTIFACT_STATUS_CALCULATOR';

  let enhancementLevel =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.enhancementLevel ?? '1';
  let artifactType = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.artifactType ?? 1;
  let artifactGrade = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.artifactGrade ?? 1;
  let firstAbility =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.firstAbility ?? abilitiesIdsAllowed[0];
  let firstAbilityLevel =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.firstAbilityLevel ?? '0';
  let secondAbility =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.secondAbility ?? abilitiesIdsAllowed[0];
  let secondAbilityLevel =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.secondAbilityLevel ?? '0';
  let thirdAbility =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.thirdAbility ?? abilitiesIdsAllowed[0];
  let thirdAbilityLevel =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.thirdAbilityLevel ?? '0';
  let fourthAbility =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.fourthAbility ?? abilitiesIdsAllowed[0];
  let fourthAbilityLevel =
    $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.fourthAbilityLevel ?? '0';
  let result;

  const updateStore = () => {
    updateCalculatorInformation(CALCULATOR_STORE_KEY, {
      enhancementLevel,
      artifactType,
      artifactGrade,
      firstAbility,
      firstAbilityLevel,
      secondAbility,
      secondAbilityLevel,
      thirdAbility,
      thirdAbilityLevel,
      fourthAbility,
      fourthAbilityLevel,
    });
  };

  const artifactTypeOptions = artifacts.map((item) => ({ name: item.name, value: item.id }));

  const abilitiesOptions = abilitiesIdsAllowed.map((ability) => {
    return {
      name: returnAbilityName(ability as Abilities),
      value: ability,
    };
  });

  const updateResult = () => {
    result = calculateArtifactStats({
      type: artifactType,
      grade: artifactGrade,
      level: enhancementLevel,
      abilities: {
        1: { type: firstAbility, level: firstAbilityLevel },
        2: { type: secondAbility, level: secondAbilityLevel },
        3: { type: thirdAbility, level: thirdAbilityLevel },
        4: { type: fourthAbility, level: fourthAbilityLevel },
      },
    });
  };

  const update = () => {
    updateResult();
    updateStore();
  };

  $: (artifactType ||
    artifactGrade ||
    firstAbility ||
    firstAbilityLevel ||
    secondAbility ||
    secondAbilityLevel ||
    thirdAbility ||
    thirdAbilityLevel ||
    fourthAbility ||
    fourthAbilityLevel ||
    enhancementLevel) &&
    update();
</script>

<div class={styles.container}>
  <Text>Artifact Type</Text>
  <SelectButtons bind:value={artifactType} options={artifactTypeOptions} />
  <InputGrade bind:grade={artifactGrade} />
  <Input
    textAlign="center"
    label="Enchantment Level"
    bind:value={enhancementLevel}
    maskOptions={{
      mask: Number,
      min: 0,
    }}
  />
  <div>
    <Text textAlign="center">First ability</Text>
    <div class={styles.abilityContainer}>
      <Select label="Name" bind:value={firstAbility} options={abilitiesOptions} />
      <Input
        textAlign="center"
        label="Level"
        bind:value={firstAbilityLevel}
        maskOptions={{
          mask: Number,
          min: 0,
        }}
      />
    </div>
  </div>
  <div>
    <Text textAlign="center">Second ability</Text>
    <div class={styles.abilityContainer}>
      <Select label="Name" bind:value={secondAbility} options={abilitiesOptions} />
      <Input
        textAlign="center"
        label="Level"
        bind:value={secondAbilityLevel}
        maskOptions={{
          mask: Number,
          min: 0,
        }}
      />
    </div>
  </div>
  <div>
    <Text textAlign="center">Third ability</Text>
    <div class={styles.abilityContainer}>
      <Select label="Name" bind:value={thirdAbility} options={abilitiesOptions} />
      <Input
        textAlign="center"
        label="Level"
        bind:value={thirdAbilityLevel}
        maskOptions={{
          mask: Number,
          min: 0,
        }}
      />
    </div>
  </div>
  <div>
    <Text textAlign="center">Fourth ability</Text>
    <div class={styles.abilityContainer}>
      <Select label="Name" bind:value={fourthAbility} options={abilitiesOptions} />
      <Input
        textAlign="center"
        label="Level"
        bind:value={fourthAbilityLevel}
        maskOptions={{
          mask: Number,
          min: 0,
        }}
      />
    </div>
  </div>
  <div class={styles.result}>
    {#if result}
      <div class={tableStyles.table2Columns}>
        <div class={tableStyles.tableRowVariant[getRowStyling(0)]}>
          <div class={tableStyles.tableItem}>
            <Text textAlign="center">{result.name}</Text>
          </div>
          <div class={tableStyles.tableItem}>
            <Text textAlign="center">{result.value}</Text>
          </div>
        </div>
        {#each Object.keys(result.abilities) as ability, row}
          <div class={tableStyles.tableRowVariant[getRowStyling(row + 1)]}>
            <div class={tableStyles.tableItem}>
              <Text textAlign="center">{result.abilities[ability].name}</Text>
            </div>
            <div class={tableStyles.tableItem}>
              <Text textAlign="center">{result.abilities[ability].value}</Text>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
