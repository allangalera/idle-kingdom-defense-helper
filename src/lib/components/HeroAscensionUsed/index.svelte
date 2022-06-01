<script lang="ts">
  import Text from '$lib/components/Text/index.svelte';
  import { MAX_HERO_GRADE, heroes } from '$lib/db/heroes';
  import { heroes as heroesStore } from '$lib/shared/stores/user/heroes';
  import { calculateAscendCost } from '$lib/utils/hero';
  import * as R from 'remeda';
  import { onMount } from 'svelte';

  let need = 0;
  let used = 0;

  const getHeroesWithUserData = () => {
    for (const hero of heroes) {
      let userHero = R.pathOr($heroesStore, ['heroes'], []).find((userH) => userH.id === hero.id);
      const heroData = {
        ...hero,
        ...userHero,
      };
      const needCost = calculateAscendCost(heroData.grade ?? heroData.baseGrade, MAX_HERO_GRADE);
      need += needCost.ascensionStones;
      const usedCost = calculateAscendCost(
        heroData.baseGrade,
        heroData.grade ?? heroData.baseGrade
      );
      used += usedCost.ascensionStones;
    }
  };

  onMount(() => {
    getHeroesWithUserData();
  });
</script>

<Text>Ascension Stones used until now: {used.toLocaleString()}</Text>
<Text>Ascension Stones need to maxed out all heroes: {need.toLocaleString()}</Text>
