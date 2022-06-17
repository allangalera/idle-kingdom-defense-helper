<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import { RarityEnum } from '$lib/enums';
  import { convertGradeToStarLevel } from '$lib/utils';
  import { match } from 'oxide.ts';

  import * as styles from './index.css';

  export let grade = 1;

  let convertedGrade = convertGradeToStarLevel(grade);
  let selectedRarity = convertedGrade.rarity;
  let selectedLevel = convertedGrade.level - 1;

  const imagesByGrade = {
    [RarityEnum.common]: '/images/icons/iconStarBig1.png',
    [RarityEnum.uncommon]: '/images/icons/iconStarBig2.png',
    [RarityEnum.rare]: '/images/icons/iconStarBig3.png',
    [RarityEnum.epic]: '/images/icons/iconStarBig4.png',
    [RarityEnum.legendary]: '/images/icons/iconStarBig5.png',
    [RarityEnum.mythic]: '/images/icons/iconStarBig6.png',
  };

  const getRarityGrade = (rarity: RarityEnum) => {
    return match(rarity, [
      [RarityEnum.common, 1],
      [RarityEnum.uncommon, 6],
      [RarityEnum.rare, 11],
      [RarityEnum.epic, 16],
      [RarityEnum.legendary, 21],
      [RarityEnum.mythic, 26],
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
    grade = rarityGrade + level;
  };

  $: calculateGrade(selectedRarity, selectedLevel);
</script>

<div>
  <div class={styles.rarityContainer}>
    <Button variant="logic" on:click={selectRarity(RarityEnum.common)}>
      <img
        loading="lazy"
        class={styles.imageVariant[selectedRarity === RarityEnum.common ? 'default' : 'disabled']}
        src={imagesByGrade[RarityEnum.common]}
        alt="Common grade star icon"
      />
    </Button>
    <Button variant="logic" on:click={selectRarity(RarityEnum.uncommon)}>
      <img
        loading="lazy"
        class={styles.imageVariant[selectedRarity === RarityEnum.uncommon ? 'default' : 'disabled']}
        src={imagesByGrade[RarityEnum.uncommon]}
        alt="Common grade star icon"
      />
    </Button>
    <Button variant="logic" on:click={selectRarity(RarityEnum.rare)}>
      <img
        loading="lazy"
        class={styles.imageVariant[selectedRarity === RarityEnum.rare ? 'default' : 'disabled']}
        src={imagesByGrade[RarityEnum.rare]}
        alt="Common grade star icon"
      />
    </Button>
    <Button variant="logic" on:click={selectRarity(RarityEnum.epic)}>
      <img
        loading="lazy"
        class={styles.imageVariant[selectedRarity === RarityEnum.epic ? 'default' : 'disabled']}
        src={imagesByGrade[RarityEnum.epic]}
        alt="Common grade star icon"
      />
    </Button>
    <Button variant="logic" on:click={selectRarity(RarityEnum.legendary)}>
      <img
        loading="lazy"
        class={styles.imageVariant[
          selectedRarity === RarityEnum.legendary ? 'default' : 'disabled'
        ]}
        src={imagesByGrade[RarityEnum.legendary]}
        alt="Common grade star icon"
      />
    </Button>
    <Button variant="logic" on:click={selectRarity(RarityEnum.mythic)}>
      <img
        loading="lazy"
        class={styles.imageVariant[selectedRarity === RarityEnum.mythic ? 'default' : 'disabled']}
        src={imagesByGrade[RarityEnum.mythic]}
        alt="Common grade star icon"
      />
    </Button>
  </div>
  <br />
  <div class={styles.levelContainer}>
    {#each { length: 5 } as _, i}
      <Button variant="logic" on:click={selectLevel(i)}>
        <img
          loading="lazy"
          class={styles.imageVariant[selectedLevel >= i ? 'default' : 'disabled']}
          src={imagesByGrade[selectedRarity]}
          alt="Grade star icon"
        />
      </Button>
    {/each}
  </div>
</div>
