<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import ModalEditHeroRune from '$lib/components/ModalEditHeroRune/index.svelte';
  import RuneIcon from '$lib/components/RuneIcon/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { MAX_HERO_GRADE } from '$lib/db/heroes';
  import { runes, runesMap } from '$lib/db/runes';
  import {
    getDependantRuneData,
    getLevelFromGrade,
    getRarityFromGrade,
    isRuneAvailable,
  } from '$lib/utils/hero';

  import * as styles from './index.css';

  export let hero;
  export let heroUserData;

  let isModalOpen = false;
  let selectedRune;

  const onOpenModal = (rune) => {
    if (!heroUserData) return false;
    selectedRune = rune;
    isModalOpen = true;
  };

  const getDependentRune = (runeId) => {
    return runesMap.get(runeId);
  };

  const getRotation = (idx1, idx2) => {
    if (idx1 === idx2) return '0deg';
    if (idx1 > idx2) return '-45deg';
    return '45deg';
  };

  const getLineContainerPosition = (rune) => {
    const dependentRune = getDependentRune(rune.openCondition.id);

    if (dependentRune.idx > rune.idx) {
      return `grid-column-start: ${dependentRune.grade}; grid-column-end: ${
        rune.grade + 1
      }; grid-row-start: ${dependentRune.idx}; grid-row-end: ${rune.idx + 3};`;
    }

    return `grid-column-start: ${dependentRune.grade}; grid-column-end: ${
      rune.grade + 1
    }; grid-row-start: ${dependentRune.idx + 1}; grid-row-end: ${rune.idx + 2};`;
  };
</script>

<GridItem title="Runes" full>
  <div class={styles.container}>
    <div class={styles.gridContainer}>
      {#each { length: MAX_HERO_GRADE } as _, index}
        <div class={styles.gradeHeader}>
          {#each { length: getLevelFromGrade(index + 1) } as _}
            <img
              loading="lazy"
              class={styles.start}
              src={`/images/icons/iconStarBig${getRarityFromGrade(index + 1)}.png`}
              alt="ranking icon"
            />
          {/each}
        </div>
      {/each}
      {#each runes as rune}
        <div
          style={`grid-column: ${rune.grade}; grid-row: ${rune.idx + 1};`}
          class={styles.runeContainer}
        >
          <div
            class={styles.runeVariant[
              isRuneAvailable(rune.id, heroUserData) ? 'default' : 'disabled'
            ]}
          >
            <Button
              variant="logic"
              on:click={() => onOpenModal(rune)}
              disabled={!isRuneAvailable(rune.id, heroUserData)}
            >
              <RuneIcon
                grade={rune.grade}
                abilityType={rune.abilityType}
                runeData={rune}
                heroUserData={heroUserData?.runes?.[rune.id]}
              />
            </Button>
          </div>
          {#if !isRuneAvailable(rune.id, heroUserData)}
            <div class={styles.dependencyRuneCounterContainer}>
              <Text fontSize="sm">
                {getDependantRuneData(rune.id, heroUserData)?.have ?? 0}/{getDependantRuneData(
                  rune.id,
                  heroUserData
                ).need}</Text
              >
            </div>
          {/if}
        </div>
        {#if rune.openCondition.id !== 0}
          <div class={styles.lineContainer} style={getLineContainerPosition(rune)}>
            <div
              class={styles.lineVariant[
                isRuneAvailable(rune.id, heroUserData) ? 'available' : 'default'
              ]}
              style={`transform: rotate(${getRotation(
                getDependentRune(rune.openCondition.id).idx,
                rune.idx
              )})`}
            />
          </div>
        {/if}
      {/each}
    </div>
  </div>
</GridItem>
<ModalEditHeroRune
  open={isModalOpen}
  onClose={() => {
    isModalOpen = false;
  }}
  rune={selectedRune}
  {hero}
  userHero={heroUserData}
/>
