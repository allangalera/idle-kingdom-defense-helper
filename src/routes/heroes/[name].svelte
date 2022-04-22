<script lang="ts">
  import CardHero from '$lib/components/CardHero/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { HeroGearEquip } from '$lib/enums';
  import { heroes as heroesStore } from '$lib/shared/stores/user/heroes';
  import { capitalCase } from 'change-case';
  import * as R from 'remeda';

  export let hero;
  export let heroUserData;

  const getUserHeroData = (heroId: number) => {
    if ($heroesStore.heroes)
      heroUserData = R.pathOr($heroesStore, ['heroes'], []).find((item) => item.id === heroId);
  };

  $: getUserHeroData(hero.id);
</script>

<Heading textAlign="center" fontSize="3xl">{hero.name}</Heading>
<CardHero hero={{ ...hero, ...heroUserData }} />
<Text>Level: {R.pathOr(heroUserData, ['level'], 1)}</Text>

<Heading>Equips</Heading>
<Text>{capitalCase(HeroGearEquip.weapon)}</Text>
<Text>{capitalCase(HeroGearEquip.chest)}</Text>
<Text>{capitalCase(HeroGearEquip.helmet)}</Text>
<Text>{capitalCase(HeroGearEquip.boots)}</Text>
