<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { convertGradeToRarityAndLevel } from '$lib/utils/hero';

  export let size: Sprinkles['width'] = 14;
  export let abilityType: number;
  export let grade: number;

  let rarityLevel = convertGradeToRarityAndLevel(grade);

  $: rarityLevel = convertGradeToRarityAndLevel(grade);
</script>

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
