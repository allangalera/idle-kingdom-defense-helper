<script lang="ts">
  import * as R from 'remeda';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiSystemArrowRightSLine from 'svelte-icons-pack/ri/RiSystemArrowRightSLine';
  import RiSystemArrowLeftSLine from 'svelte-icons-pack/ri/RiSystemArrowLeftSLine';
  import { onDestroy } from 'svelte';
  import { match } from 'oxide.ts';

  import { stage, updateStage } from '$lib/shared/stores/user/stage';
  import CardToggle from '$lib/components/CardToggle/index.svelte';
  import EnemyToggle from '$lib/components/EnemyToggle/index.svelte';
  import Button from '$lib/components/Button/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import StageResult from '$lib/components/StageResult/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import { ArcherGearEquip, HeroGearEquip } from '$lib/enums';
  import { MAX_STAGE_LEVEL } from '$lib/constants';
  import { calculateStage, returnItemLevelDropFromStage } from '$lib/utils/stage';
  import { uniqueEnemies } from '$lib/db';
  import { theme } from '$lib/styles/themes/index.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { convertGradeToStarLevel } from '$lib/utils';

  import * as styles from './index.css';

  let timer;
  let stageLevel = $stage?.stage?.toString() ?? '1';
  let results = {};
  let result = {
    stages: [],
    latestStageSearched: 0,
  };
  let page = 1;
  let latestStageSearched = 0;
  let bestGearGrade;
  let bestArcherGearRarityAndLevel;
  let bestHeroGearRarityAndLevel;
  let gear = {
    hero: {
      weapon: false,
      helmet: false,
      chest: false,
      boots: false,
    },
    archer: {
      bow: false,
      arrow: false,
      helmet: false,
      chest: false,
      gloves: false,
      boots: false,
    },
  };
  let gearsToFind = {
    hero: [],
    archer: [],
  };
  let stageSelected = stageLevel;
  let enemiesSelected = new Map();

  function reset() {
    page = 1;
    results = {};
  }

  function returnGearsToFind(inputGear) {
    reset();
    let wanted = {
      hero: [],
      archer: [],
    };
    for (const heroGear of Object.keys(inputGear.hero)) {
      if (inputGear.hero[heroGear]) wanted.hero.push(heroGear);
    }
    for (const archerGear of Object.keys(inputGear.archer)) {
      if (inputGear.archer[archerGear]) wanted.archer.push(archerGear);
    }

    return wanted;
  }

  function changeStageLevel(stage) {
    reset();
    return stage;
  }

  function changeEnemiesSelected(enemy, event) {
    reset();
    if (event.target.checked) enemiesSelected.set(enemy, enemy);
    else enemiesSelected.delete(enemy);
    enemiesSelected = new Map(enemiesSelected);
  }

  function goBackPage() {
    page = Math.max(page - 1, 1);
  }

  function goForwardPage() {
    if (result.stages.length < 20) return;
    page = page + 1;
  }

  function debounce(stageLevel, gear, enemies, currentPage) {
    const myEnemies = Array.from(enemies.values());
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (results[currentPage]) {
        result = results[currentPage];
        return;
      }
      let stageToCalculate = match(currentPage, [[1, stageLevel], () => latestStageSearched]);
      const { stages, latestStageSearched: lss } = calculateStage(
        stageToCalculate,
        gear,
        myEnemies
      );
      result = {
        stages,
        latestStageSearched: lss,
      };
      results[currentPage] = result;
      bestGearGrade = returnItemLevelDropFromStage(+stageLevel);
      latestStageSearched = lss;
    }, 0);
  }

  $: bestArcherGearRarityAndLevel = convertGradeToStarLevel(R.pathOr(bestGearGrade, ['archer'], 1));
  $: bestHeroGearRarityAndLevel = convertGradeToStarLevel(R.pathOr(bestGearGrade, ['hero'], 1));
  $: gearsToFind = returnGearsToFind(gear);
  $: stageSelected = changeStageLevel(stageLevel);
  $: debounce(stageSelected, gearsToFind, enemiesSelected, page);
  $: updateStage(+stageLevel);

  const unsubscribe = stage.subscribe((value) => {
    if (!value.stage) return;
    if (value.stage === +stageLevel) return;
    stageLevel = value.stage.toString();
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class={styles.container}>
  <Input
    textAlign="center"
    bind:value={stageLevel}
    maskOptions={{
      mask: Number,
      min: 0,
      max: MAX_STAGE_LEVEL,
    }}
    label="Current stage"
  />
  <Text>Hero</Text>
  <div class={styles.flex}>
    <CardToggle
      gearType={{
        type: 'hero',
        equip: HeroGearEquip.weapon,
        rarity: bestHeroGearRarityAndLevel.rarity,
        level: bestHeroGearRarityAndLevel.level,
      }}
      bind:checked={gear.hero.weapon}
    />
    <CardToggle
      gearType={{
        type: 'hero',
        equip: HeroGearEquip.helmet,
        rarity: bestHeroGearRarityAndLevel.rarity,
        level: bestHeroGearRarityAndLevel.level,
      }}
      bind:checked={gear.hero.helmet}
    />
    <CardToggle
      gearType={{
        type: 'hero',
        equip: HeroGearEquip.chest,
        rarity: bestHeroGearRarityAndLevel.rarity,
        level: bestHeroGearRarityAndLevel.level,
      }}
      bind:checked={gear.hero.chest}
    />
    <CardToggle
      gearType={{
        type: 'hero',
        equip: HeroGearEquip.boots,
        rarity: bestHeroGearRarityAndLevel.rarity,
        level: bestHeroGearRarityAndLevel.level,
      }}
      bind:checked={gear.hero.boots}
    />
  </div>
  <Text>Archer</Text>
  <div class={styles.flex}>
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.bow,
        rarity: bestArcherGearRarityAndLevel.rarity,
        level: bestArcherGearRarityAndLevel.level,
      }}
      bind:checked={gear.archer.bow}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.arrow,
        rarity: bestArcherGearRarityAndLevel.rarity,
        level: bestArcherGearRarityAndLevel.level,
      }}
      bind:checked={gear.archer.arrow}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.helmet,
        rarity: bestArcherGearRarityAndLevel.rarity,
        level: bestArcherGearRarityAndLevel.level,
      }}
      bind:checked={gear.archer.helmet}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.chest,
        rarity: bestArcherGearRarityAndLevel.rarity,
        level: bestArcherGearRarityAndLevel.level,
      }}
      bind:checked={gear.archer.chest}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.gloves,
        rarity: bestArcherGearRarityAndLevel.rarity,
        level: bestArcherGearRarityAndLevel.level,
      }}
      bind:checked={gear.archer.gloves}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.boots,
        rarity: bestArcherGearRarityAndLevel.rarity,
        level: bestArcherGearRarityAndLevel.level,
      }}
      bind:checked={gear.archer.boots}
    />
  </div>
  <Text>Enemy</Text>
  <div class={styles.flex}>
    {#each uniqueEnemies as enemyId}
      {#if enemyId < 50}
        <EnemyToggle {enemyId} on:change={(event) => changeEnemiesSelected(enemyId, event)} />
      {/if}
    {/each}
  </div>
  {#if result.stages.length > 0}
    <Heading>Results</Heading>
    <div class={styles.flex}>
      {#each result.stages as stageData (stageData.stage)}
        <StageResult {stageData} />
      {/each}
    </div>
  {/if}
  <div
    class={sprinkles({
      display: 'flex',
      gap: 4,
    })}
  >
    <Button variant="primary" on:click={goBackPage} disabled={page === 1}>
      <Icon className={styles.menuIcon} src={RiSystemArrowLeftSLine} color={theme.colors.white} />
    </Button>
    <Button on:click={goForwardPage} disabled={result.stages.length < 20}>
      <Icon className={styles.menuIcon} src={RiSystemArrowRightSLine} color={theme.colors.white} />
    </Button>
  </div>
</div>
