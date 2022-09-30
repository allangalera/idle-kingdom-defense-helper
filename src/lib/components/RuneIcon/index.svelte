<script lang="ts">
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { convertGradeToRarityAndLevel } from '$lib/utils/hero';
  import { returnRuneCurrentMinMax } from '$lib/utils/runes';

  import * as styles from './styles.css';

  export let size: Sprinkles['width'] = 14;
  export let abilityType: number;
  export let grade: number;
  export let runeData;
  export let heroUserData = null;

  let rarityLevel = convertGradeToRarityAndLevel(grade);
  let currentMinMax = returnRuneCurrentMinMax(runeData?.id, heroUserData);
  let progressPercent = 0;
  let progressTier = 1;

  const updatePercent = () => {
    if (!heroUserData) return;
    const tmpMax = currentMinMax.max - currentMinMax.min;
    const tmpValue = heroUserData.value - currentMinMax.min;
    if (tmpValue === 0) {
      progressPercent = 0;
      return;
    }
    progressPercent = Math.min(Math.max((tmpValue / tmpMax) * 100, 0), 100);
  };

  const updateTier = () => {
    if (progressPercent <= 25) {
      progressTier = 1;
      return;
    }
    if (progressPercent <= 50) {
      progressTier = 2;
      return;
    }
    if (progressPercent <= 75) {
      progressTier = 3;
      return;
    }
    progressTier = 4;
    return;
  };

  $: rarityLevel = convertGradeToRarityAndLevel(grade);
  $: currentMinMax = returnRuneCurrentMinMax(runeData?.id, heroUserData);
  $: (runeData || heroUserData) && updatePercent();
  $: progressPercent && updateTier();
</script>

<div class={styles.container}>
  <img
    class={sprinkles({
      width: size,
      height: size,
    })}
    loading="lazy"
    src={`/images/plist/sprRune${rarityLevel.rarity + 1}${abilityType
      .toString()
      .padStart(2, '0')}.png`}
    alt="Rune Icon"
  />
  {#if heroUserData}
    <div class={styles.enchantLevel}>
      <Text fontSize="xs" color="white">+{heroUserData.enchant}</Text>
    </div>
    <div class={styles.progressBarContainer}>
      <div class={styles.progressBar} style={`width: ${progressPercent}%;`} />
    </div>
    <div class={styles.tierContainer}>
      <img
        class={styles.tier}
        loading="lazy"
        src={`/images/icons/iconGearQuality${progressTier}.png`}
        alt="Tier icon"
      />
    </div>
  {/if}
</div>
