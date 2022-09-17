<script lang="ts">
  import CardBorder from '$lib/components/CardBorder/index.svelte';
  import { artifacts } from '$lib/db/artifacts';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import type { CardGearType } from '$lib/types';
  import {
    convertGradeToRarityAndLevel,
    getLevelFromGrade,
    getRarityFromGrade,
    returnRarityName,
  } from '$lib/utils/hero';
  import { match } from 'oxide.ts';

  import * as styles from './index.css';

  export let artifactData;
  export let width: Sprinkles['width'] = 24;

  let rarityAndLevel;
  let rarity;
  let level;

  const gearOptions = artifacts;

  const heroGearEquip = {
    all: 0,
    weapon: 1,
    helmet: 2,
    chest: 3,
    boots: 4,
  };

  const archerGearEquip = {
    bow: 1,
    arrow: 2,
    helmet: 3,
    chest: 4,
    gloves: 5,
    boots: 6,
  };

  const blueprintGearEquip = {
    all: 0,
    bow: 1,
    arrow: 2,
    helmet: 3,
    chest: 4,
    gloves: 5,
    boots: 6,
  };

  const gearRarity = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
    mythic: 6,
  };

  const getImageSrc = ({ type, rarity }) => {
    return `/images/icons/imgArtifact_${type}_${rarity}.png`;
  };

  const rarityColors = {
    common: 'cardBorderDefault',
    uncommon: 'cardBoarderTierUncommon',
    rare: 'cardBoarderTierRare',
    epic: 'cardBoarderTierEpic',
    legendary: 'cardBoarderTierLegendary',
    mythic: 'cardBoarderTierMythic',
  } as const;

  const getCardBorderColor = (rarity) => {
    return rarityColors[rarity];
  };

  $: level = getLevelFromGrade(artifactData.grade);
  $: rarity = getRarityFromGrade(artifactData.grade);

  $: rarityAndLevel = convertGradeToRarityAndLevel(artifactData.grade);
</script>

{#if rarity && level}
  <CardBorder
    borderColor={getCardBorderColor(rarity)}
    background={getCardBorderColor(rarity)}
    {width}
    {level}
    rarity={returnRarityName(rarity).toLowerCase()}
  >
    <div class={styles.wrapper}>
      <img
        loading="lazy"
        class={styles.img}
        src={getImageSrc({ type: artifactData.type, rarity })}
        alt="Artifact slot"
      />
    </div>
  </CardBorder>
{/if}
