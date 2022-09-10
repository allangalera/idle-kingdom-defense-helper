<script lang="ts">
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { convertGradeToRarityAndLevel, isRuneAvailable } from '$lib/utils/hero';

  import * as styles from './styles.css';

  export let size: Sprinkles['width'] = 14;
  export let abilityType: number;
  export let grade: number;
  export let heroUserData = null;

  let rarityLevel = convertGradeToRarityAndLevel(grade);

  $: rarityLevel = convertGradeToRarityAndLevel(grade);
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
      <Text fontSize="sm" color="white">+{heroUserData.enchant}</Text>
    </div>
    <div />
  {/if}
</div>
