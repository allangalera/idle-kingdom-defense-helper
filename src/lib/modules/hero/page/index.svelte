<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import CardHero from '$lib/components/CardHero/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Link from '$lib/components/Link/index.svelte';
  import ModalAddHero from '$lib/components/ModalAddHero/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import type { HeroType } from '$lib/db/heroes';
  import Equipments from '$lib/modules/hero/components/Equipments/index.svelte';
  import Skills from '$lib/modules/hero/components/Skills/index.svelte';
  import Stats from '$lib/modules/hero/components/Stats/index.svelte';
  import { heroes as heroesStore } from '$lib/shared/stores/user/heroes';
  import { calculateHeroStats } from '$lib/utils/hero';
  import * as R from 'remeda';

  import * as styles from './index.css';

  export let hero;
  export let heroUserData;

  let heroStats: Partial<HeroType>;
  let addModalOpen = false;

  const getUserHeroData = (heroId: number) => {
    if ($heroesStore.heroes)
      heroUserData = R.pathOr($heroesStore, ['heroes'], []).find((item) => item.id === heroId);
  };

  const openAddModal = () => {
    addModalOpen = true;
  };

  heroesStore.subscribe((data) => {
    heroUserData = data?.heroes?.find((item) => item.id === hero.id) || null;
  });

  $: getUserHeroData(hero.id);
  $: heroStats = calculateHeroStats(hero, heroUserData);
</script>

<Link href="/heroes">Back to Heroes</Link>
<Heading textAlign="center" fontSize="3xl" marginBottom={4}>{hero.name}</Heading>
<div class={styles.container}>
  <div class={styles.cardContainer}>
    <CardHero hero={{ ...hero, ...heroUserData }} width={40} />
    <Text textAlign="center">Level: {R.pathOr(heroUserData, ['level'], 1)}</Text>
    <Button on:click={openAddModal}>
      <Text color="white" as="span">Edit</Text>
    </Button>
  </div>
  <div class={styles.infoContainer}>
    <Stats {heroStats} />
    <Equipments {hero} {heroUserData} />
    <Skills {hero} {heroUserData} />
    <!-- <GridItem title="Runes" full>
      <Text>Runes</Text>
    </GridItem> -->
  </div>
</div>

<ModalAddHero
  open={addModalOpen}
  onClose={() => {
    addModalOpen = false;
  }}
  {hero}
  userHero={heroUserData}
/>