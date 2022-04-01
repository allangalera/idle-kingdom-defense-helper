<script lang="ts">
  import * as styles from './index.css';

  import type { Grades } from '$lib/types';
  import { match } from 'oxide.ts';
  import { convertGradeToStarLevel } from '$lib/utils';
  import { RarityEnum } from '$lib/enums';

  export let grade: Grades = 1;

  let convertedGrade = convertGradeToStarLevel(grade);
  let selectedRarity = convertedGrade.rarity;
  let selectedLevel = convertedGrade.level - 1;

  const imagesByGrade = {
    [RarityEnum.common]: 'images/ranking/iconStarBig1.png',
    [RarityEnum.uncommon]: 'images/ranking/iconStarBig2.png',
    [RarityEnum.rare]: 'images/ranking/iconStarBig3.png',
    [RarityEnum.epic]: 'images/ranking/iconStarBig4.png',
    [RarityEnum.legendary]: 'images/ranking/iconStarBig5.png',
  };

  const getRarityGrade = (rarity: RarityEnum) => {
    return match(rarity, [
      [RarityEnum.common, 1],
      [RarityEnum.uncommon, 6],
      [RarityEnum.rare, 11],
      [RarityEnum.epic, 16],
      [RarityEnum.legendary, 21],
    ]);
  };

  const selectRarity = (rarity: RarityEnum) => () => {
    selectedRarity = rarity;
  };

  const selectLevel = (level: number) => () => {
    selectedLevel = level;
  };

  const calculateGrade = (rarity, level) => {
    let rarityGrade = getRarityGrade(rarity);
    grade = (rarityGrade + level) as Grades;
  };

  $: calculateGrade(selectedRarity, selectedLevel);
</script>

<div>
  <div class={styles.rarityContainer}>
    <div role="button" class={styles.button} on:click={selectRarity(RarityEnum.common)}>
      <img
        loading="lazy"
        class={styles.imageVariant[selectedRarity === RarityEnum.common ? 'default' : 'disabled']}
        src={imagesByGrade[RarityEnum.common]}
        alt="Common grade star icon"
      />
    </div>
    <div role="button" class={styles.button} on:click={selectRarity(RarityEnum.uncommon)}>
      <img
        loading="lazy"
        class={styles.imageVariant[selectedRarity === RarityEnum.uncommon ? 'default' : 'disabled']}
        src={imagesByGrade[RarityEnum.uncommon]}
        alt="Common grade star icon"
      />
    </div>
    <div role="button" class={styles.button} on:click={selectRarity(RarityEnum.rare)}>
      <img
        loading="lazy"
        class={styles.imageVariant[selectedRarity === RarityEnum.rare ? 'default' : 'disabled']}
        src={imagesByGrade[RarityEnum.rare]}
        alt="Common grade star icon"
      />
    </div>
    <div role="button" class={styles.button} on:click={selectRarity(RarityEnum.epic)}>
      <img
        loading="lazy"
        class={styles.imageVariant[selectedRarity === RarityEnum.epic ? 'default' : 'disabled']}
        src={imagesByGrade[RarityEnum.epic]}
        alt="Common grade star icon"
      />
    </div>
    <div role="button" class={styles.button} on:click={selectRarity(RarityEnum.legendary)}>
      <img
        loading="lazy"
        class={styles.imageVariant[
          selectedRarity === RarityEnum.legendary ? 'default' : 'disabled'
        ]}
        src={imagesByGrade[RarityEnum.legendary]}
        alt="Common grade star icon"
      />
    </div>
  </div>
  <br />
  <div class={styles.levelContainer}>
    {#each { length: 5 } as _, i}
      <div role="button" class={styles.button} on:click={selectLevel(i)}>
        <img
          loading="lazy"
          class={styles.imageVariant[selectedLevel >= i ? 'default' : 'disabled']}
          src={imagesByGrade[selectedRarity]}
          alt="Grade star icon"
        />
      </div>
    {/each}
  </div>
</div>
