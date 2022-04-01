<script lang="ts">
  import * as styles from './index.css';
  import { kingdoms } from '$lib/db/conquest';
  import * as R from 'remeda';
  import { conquest, addKingdom, removeKingdom } from '$lib/shared/stores/user/conquest';
  import { heroes as heroesStore } from '$lib/shared/stores/user/heroes';
  import { heroes, defaultSortingHeroes } from '$lib/db/heroes';
  import {
    sortKingdomByAscensionStoneAndCoin,
    kingdomNameToRomanNumber,
  } from '$lib/utils/conquest';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiSystemDeleteBinFill from 'svelte-icons-pack/ri/RiSystemDeleteBinFill';
  import RiSystemAddFill from 'svelte-icons-pack/ri/RiSystemAddFill';
  import Heading from '$lib/components/Heading/index.svelte';
  import CardHero from '$lib/components/CardHero/index.svelte';
  import CardBorder from '$lib/components/CardBorder/index.svelte';
  import Button from '$lib/components/Button/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { theme } from '$lib/styles/themes/index.css';
  import type { Hero } from '$lib/types';

  let sortedKingdoms = sortKingdomByAscensionStoneAndCoin(kingdoms);
  let userKingdomsAndHeroes = [];

  const borderColorByContinent = {
    1: 'green9',
    2: 'blue9',
    3: 'brown9',
  };
  const backgroundByContinent = {
    1: 'green3',
    2: 'blue3',
    3: 'brown3',
  };

  const add = (kingdomId) => {
    addKingdom(kingdomId);
  };

  const remove = (kingdomId) => {
    removeKingdom(kingdomId);
  };

  const getHeroById = (heroId) => {
    if (R.isNil(heroId)) return false;
    return heroes.find((hero) => hero.id === heroId);
  };

  conquest.subscribe((value) => {
    let userKingdoms = R.pathOr(value, ['kingdoms'], []);
    let sortedHeroes = defaultSortingHeroes(
      R.pathOr($heroesStore, ['heroes'], []) as unknown as Hero[]
    );
    userKingdomsAndHeroes = sortedKingdoms.map((kingdom) => {
      const isKingdomAdded = userKingdoms.some((item) => item === kingdom.id);
      let heroSuggestion = null;
      if (isKingdomAdded) {
        heroSuggestion = sortedHeroes.shift();
      }
      if (heroSuggestion) {
        heroSuggestion = {
          ...getHeroById(heroSuggestion.id),
          ...heroSuggestion,
        };
      }
      return {
        ...kingdom,
        isKingdomAdded,
        heroSuggestion,
      };
    });
  });
</script>

<div class={styles.container}>
  <!-- Heading -->
  <Heading textAlign="center" fontSize="xl">Capital</Heading>
  <div class={styles.centerFlex}>
    <img
      loading="lazy"
      class={styles.ascensionIcon}
      src="images/icons/iconEvolveStone.png"
      alt="ascension icon"
    />
  </div>
  <div class={styles.centerFlex}>
    <img
      loading="lazy"
      class={styles.ascensionIcon}
      src="images/icons/iconGold.png"
      alt="gold icon"
    />
  </div>
  <Heading textAlign="center" fontSize="xl">Action</Heading>
  <Heading textAlign="center" fontSize="xl">Hero</Heading>
  <!-- Body -->
  {#each userKingdomsAndHeroes as kingdom (kingdom.id)}
    <div
      class={[
        styles.kingdomName,
        sprinkles({
          background: backgroundByContinent[kingdom.continentId],
          borderColor: borderColorByContinent[kingdom.continentId],
          width: {
            mobile: 16,
            tablet: 24,
          },
        }),
      ].join(' ')}
    >
      <Text as="span" fontSize={{ mobile: 'xs', tablet: 'sm' }} textAlign="center"
        >{kingdom.continent} {kingdomNameToRomanNumber(kingdom.name)}</Text
      >
    </div>
    <Text textAlign="center">{kingdom.rewardEvolve}</Text>
    <Text textAlign="center">{kingdom.rewardGold.toLocaleString()}</Text>
    <div class={styles.centerFlex}>
      {#if kingdom.isKingdomAdded}
        <Button type="button" variant="danger" on:click={() => remove(kingdom.id)}>
          <Icon
            className={styles.buttonIcon}
            src={RiSystemDeleteBinFill}
            color={theme.colors.white}
          />
        </Button>
      {:else}
        <Button type="button" variant="success" on:click={() => add(kingdom.id)}>
          <Icon className={styles.buttonIcon} src={RiSystemAddFill} color={theme.colors.white} />
        </Button>
      {/if}
    </div>
    <div class={styles.centerFlex}>
      {#if kingdom.heroSuggestion}
        <CardHero
          hero={kingdom.heroSuggestion}
          width={12}
          heroTypeBadgeWidth={3.5}
          borderWidth={0.5}
        />
      {:else}
        <CardBorder width={12} borderWidth={0.5} />
      {/if}
    </div>
  {/each}
</div>
