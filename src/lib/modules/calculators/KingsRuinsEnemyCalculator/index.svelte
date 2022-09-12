<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { MAX_STAGE_LEVEL } from '$lib/constants';
  import { ruinConst } from '$lib/db/ruins';
  import {
    calculatorsInformationStore,
    updateCalculatorInformation,
  } from '$lib/shared/stores/user/calculatorsInformation';
  import { theme } from '$lib/styles/themes/index.css';
  import { getEnemyPattern } from '$lib/utils/ruins';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiSystemArrowLeftSLine from 'svelte-icons-pack/ri/RiSystemArrowLeftSLine';
  import RiSystemArrowRightSLine from 'svelte-icons-pack/ri/RiSystemArrowRightSLine';

  import * as styles from './index.css';

  const CALCULATOR_STORE_KEY = 'KINGS_RUIN_ENEMY_CALCULATOR';

  let stageLevel = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.stageLevel ?? '1';
  let enemyPattern = [];

  const updateEnemyPattern = () => {
    let stageLevelAsNumber = +stageLevel;
    if (stageLevelAsNumber) enemyPattern = getEnemyPattern(stageLevelAsNumber);
  };

  const onAddStageLevel = () => {
    stageLevel = Math.min(+stageLevel + 1, MAX_STAGE_LEVEL).toString();
  };

  const onRemoveStageLevel = () => {
    stageLevel = Math.max(1, +stageLevel - 1).toString();
  };

  const updateStore = () => {
    updateCalculatorInformation(CALCULATOR_STORE_KEY, {
      stageLevel,
    });
  };

  const update = () => {
    updateEnemyPattern();
    updateStore();
  };

  $: stageLevel && update();
</script>

<div class={styles.container}>
  <div class={styles.inputContainer}>
    <Button variant="primary" on:click={onRemoveStageLevel} disabled={+stageLevel === 1}>
      <Icon className={styles.menuIcon} src={RiSystemArrowLeftSLine} color={theme.colors.white} />
    </Button>
    <Input
      label="Stage when the game daily reset"
      textAlign="center"
      bind:value={stageLevel}
      maskOptions={{
        mask: Number,
        min: 0,
        max: MAX_STAGE_LEVEL,
      }}
    />
    <Button on:click={onAddStageLevel} disabled={+stageLevel === MAX_STAGE_LEVEL}>
      <Icon className={styles.menuIcon} src={RiSystemArrowRightSLine} color={theme.colors.white} />
    </Button>
  </div>
  <Text>Enemies:</Text>
  <div class={styles.resultsContainer}>
    {#each enemyPattern as enemies, idx}
      <div class={styles.flex}>
        <div>
          <Text fontSize="lg" textAlign="center">{idx + 1}</Text>
          {#if ruinConst.REWARD.CASH[idx]}
            <Text
              >{ruinConst.REWARD.CASH[idx]}<img
                class={styles.icon}
                loading="lazy"
                src={`images/icons/iconRuby.png`}
                alt="enemy"
              /></Text
            >
          {/if}
        </div>
        {#each Object.keys(enemies) as enemy}
          {#if enemies[enemy].unitType === 5}
            <img
              loading="lazy"
              src={`images/enemies/enemy${enemies[enemy].unitId}.png`}
              alt="enemy"
            />
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>
