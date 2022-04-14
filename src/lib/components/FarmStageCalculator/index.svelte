<script lang="ts">
  import * as styles from './index.css';
  import { pathOr } from 'ramda';

  import { stage, updateStage } from '$lib/shared/stores/user/stage';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiSystemAddFill from "svelte-icons-pack/ri/RiSystemAddFill";
  import RiSystemSubtractFill from "svelte-icons-pack/ri/RiSystemSubtractFill";

  import CardToggle from '$lib/components/CardToggle/index.svelte';
  import Button from '$lib/components/Button/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import StageResult from '$lib/components/StageResult/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import { HeroGearEquip, ArcherGearEquip, RarityEnum } from '$lib/enums';
  import { MAX_STAGE_LEVEL } from '$lib/constants';
  import { calculateStage, returnItemLevelDropFromStage } from '$lib/utils/stage';
  import { onDestroy } from 'svelte';
  import { match } from 'oxide.ts';
  import { theme } from '$lib/styles/themes/index.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';

  let timer;
  let stageLevel = $stage?.stage?.toString() ?? '1';
  let results = {};
  let result = {
    stages: [],
    latestStageSearched: 0,
  };
  let page = 1;
  let latestStageSearched = 0;
  let bestGear;
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
    archer: []
  };
  let stageSelected = stageLevel;

  function returnGearsToFind(gears) {
    page = 1
    results = {};
    result = {
    stages: [],
    latestStageSearched: 0,
  };
    let wanted = {
      hero: [],
      archer: [],
    };
    for (const heroGear of Object.keys(gear.hero)) {
      if (gear.hero[heroGear]) wanted.hero.push(heroGear);
    }
    for (const archerGear of Object.keys(gear.archer)) {
      if (gear.archer[archerGear]) wanted.archer.push(archerGear);
    }

    return wanted;
  }

  function changeStageLevel(stage) {
    page = 1
    results = {};
    result = {
    stages: [],
    latestStageSearched: 0,
  };
    return stage
  }

  function goBackPage() {
    page = Math.max(page - 1, 1)
  }

  function goForwardPage() {
    if (result.stages.length < 20)  return
    page = page + 1
  }

  function debounce(stageLevel, gear, currentPage) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (results[currentPage]) {
        result = results[currentPage]
        return
      }
      let stageToCalculate = match(currentPage, [
        [1, stageLevel],
        () => latestStageSearched,
      ])
      const { stages, latestStageSearched: lss } = calculateStage(stageToCalculate, gear);
      result = {
        stages,
        latestStageSearched: lss,
      };
      results[currentPage] = result;
      bestGear = returnItemLevelDropFromStage(+stageLevel);
      latestStageSearched = lss
    }, 0);
  }

  $: gearsToFind = returnGearsToFind(gear)
  $: stageSelected = changeStageLevel(stageLevel)
  $: debounce(stageSelected, gearsToFind, page);
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
        rarity: pathOr(RarityEnum.common, ['hero', 'rarity'], bestGear),
        level: pathOr(1, ['hero', 'level'], bestGear),
      }}
      bind:checked={gear.hero.weapon}
    />
    <CardToggle
      gearType={{
        type: 'hero',
        equip: HeroGearEquip.helmet,
        rarity: pathOr(RarityEnum.common, ['hero', 'rarity'], bestGear),
        level: pathOr(1, ['hero', 'level'], bestGear),
      }}
      bind:checked={gear.hero.helmet}
    />
    <CardToggle
      gearType={{
        type: 'hero',
        equip: HeroGearEquip.chest,
        rarity: pathOr(RarityEnum.common, ['hero', 'rarity'], bestGear),
        level: pathOr(1, ['hero', 'level'], bestGear),
      }}
      bind:checked={gear.hero.chest}
    />
    <CardToggle
      gearType={{
        type: 'hero',
        equip: HeroGearEquip.boots,
        rarity: pathOr(RarityEnum.common, ['hero', 'rarity'], bestGear),
        level: pathOr(1, ['hero', 'level'], bestGear),
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
        rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
        level: pathOr(1, ['archer', 'level'], bestGear),
      }}
      bind:checked={gear.archer.bow}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.arrow,
        rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
        level: pathOr(1, ['archer', 'level'], bestGear),
      }}
      bind:checked={gear.archer.arrow}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.helmet,
        rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
        level: pathOr(1, ['archer', 'level'], bestGear),
      }}
      bind:checked={gear.archer.helmet}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.chest,
        rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
        level: pathOr(1, ['archer', 'level'], bestGear),
      }}
      bind:checked={gear.archer.chest}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.gloves,
        rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
        level: pathOr(1, ['archer', 'level'], bestGear),
      }}
      bind:checked={gear.archer.gloves}
    />
    <CardToggle
      gearType={{
        type: 'blueprint',
        equip: ArcherGearEquip.boots,
        rarity: pathOr(RarityEnum.common, ['archer', 'rarity'], bestGear),
        level: pathOr(1, ['archer', 'level'], bestGear),
      }}
      bind:checked={gear.archer.boots}
    />
  </div>
  {#if result.stages.length > 0}
    <Heading>Results</Heading>
    <div class={styles.flex}>
      {#each result.stages as stageData (stageData.stage)}
        <StageResult {stageData} />
      {/each}
    </div>
  {/if}
  <div class={sprinkles({
    display: 'flex',
    gap: 4
  })}>
    <Button variant="primary" on:click={goBackPage} disabled={page === 1}>
      <Icon className={styles.menuIcon} src={RiSystemSubtractFill} color={theme.colors.white} />
    </Button>
    <Button on:click={goForwardPage} disabled={result.stages.length < 20}>
      <Icon className={styles.menuIcon} src={RiSystemAddFill} color={theme.colors.white} />
    </Button>
  </div>
</div>
