<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import CardBorder from '$lib/components/CardBorder/index.svelte';
  import CardHero from '$lib/components/CardHero/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import ModalEditKingdomFortress from '$lib/components/ModalEditKingdomFortress/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { CONQUEST_REWARD_MULTIPLE_PERGRADE, fortress, kingdoms } from '$lib/db/conquest';
  import { defaultSortingHeroes, heroes } from '$lib/db/heroes';
  import { addKingdom, conquest, removeKingdom } from '$lib/shared/stores/user/conquest';
  import { heroes as heroesStore } from '$lib/shared/stores/user/heroes';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { theme } from '$lib/styles/themes/index.css';
  import type { Hero } from '$lib/types';
  import { getIdleKingdomNumberFormat } from '$lib/utils';
  import {
    kingdomNameToRomanNumber,
    sortKingdomByAscensionStoneAndCoin,
    sortKingdomById,
  } from '$lib/utils/conquest';
  import * as R from 'remeda';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import FaBrandsFortAwesome from 'svelte-icons-pack/fa/FaBrandsFortAwesome';
  import RiSystemAddFill from 'svelte-icons-pack/ri/RiSystemAddFill';
  import RiSystemDeleteBinFill from 'svelte-icons-pack/ri/RiSystemDeleteBinFill';

  import * as styles from './index.css';

  enum SortModes {
    byReward = 'by-reward',
    byKingdom = 'by-kingdom',
  }
  let sortMode = {
    [SortModes.byReward]: sortKingdomByAscensionStoneAndCoin,
    [SortModes.byKingdom]: sortKingdomById,
  };
  let rewards = {
    gold: 0,
    soulstone: 0,
    evolve: 0,
  };
  let userKingdomsAndHeroes = [];
  let selectedSortMode = SortModes.byReward;
  let userKingdoms = $conquest.kingdoms;
  let userFortress = $conquest.fortress;
  let selectedKingdomId;
  let isModalEditKingdomFortresOpen = false;

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

  function onChangeSortMode(event) {
    const { value } = event.target;
    selectedSortMode = value;
  }

  const onSelectKingdomToEditFortres = (id) => {
    selectedKingdomId = R.clone(id);
    isModalEditKingdomFortresOpen = true;
  };

  const onCloseModalEditKingdomFortress = () => {
    isModalEditKingdomFortresOpen = false;
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

  const generateKingdomsAndHeroes = (uKingdoms) => {
    let sortedHeroes = defaultSortingHeroes(
      R.pathOr($heroesStore, ['heroes'], []) as unknown as Hero[]
    );
    let tempKingdoms = sortKingdomByAscensionStoneAndCoin(kingdoms);
    return tempKingdoms.map((kingdom) => {
      const isKingdomAdded = uKingdoms.some((item) => item === kingdom.id);
      let heroSuggestion = null;
      if (isKingdomAdded && sortedHeroes.length !== 0) {
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
  };

  const generateTableItems = (uKingdoms, sSortMode) => {
    let tempUserKingdomsAndHeroes = generateKingdomsAndHeroes(uKingdoms);
    userKingdomsAndHeroes = sortMode[sSortMode](tempUserKingdomsAndHeroes);
  };

  const generateAcumulatedRewardsInfo = (uKingdoms) => {
    let tempRewards = {
      gold: 0,
      soulstone: 0,
      evolve: 0,
    };
    let tempUserKingdomsAndHeroes = generateKingdomsAndHeroes(uKingdoms);

    tempUserKingdomsAndHeroes.forEach((kingdom) => {
      if (kingdom.isKingdomAdded) {
        tempRewards.gold +=
          kingdom.rewardGold *
          (1 +
            R.pathOr(kingdom, ['heroSuggestion', 'grade'], 0) * CONQUEST_REWARD_MULTIPLE_PERGRADE);
        tempRewards.evolve +=
          kingdom.rewardEvolve *
          (1 +
            R.pathOr(kingdom, ['heroSuggestion', 'grade'], 0) * CONQUEST_REWARD_MULTIPLE_PERGRADE);
      }
    });

    userFortress.forEach((currentFortress) => {
      const fortressData = fortress.find((item) => item.id === currentFortress.id);

      if (!fortressData) return;
      if (fortressData.rewardType === 102) {
        tempRewards.gold +=
          (fortressData.rewardGoldInit + fortressData.rewardGoldInc * (currentFortress.level - 1)) *
          6;
      }

      if (fortressData.rewardType === 27) {
        tempRewards.soulstone +=
          (fortressData.rewardSoulInit + fortressData.rewardSoulInc * (currentFortress.level - 1)) *
          6;
      }
    });

    rewards = tempRewards;
  };

  conquest.subscribe((value) => {
    userKingdoms = value?.kingdoms ?? [];
    userFortress = value?.fortress ?? [];
  });

  $: generateTableItems(userKingdoms, selectedSortMode);
  $: generateAcumulatedRewardsInfo(userKingdoms);
</script>

<div class={styles.rewardsContainer}>
  <Heading>Total rewards</Heading>
  <div class={styles.rewardsTable}>
    <div class={styles.rewardsValues}>
      <Text
        textAlign="center"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>{getIdleKingdomNumberFormat(rewards.evolve)}</Text
      >
      <img
        loading="lazy"
        class={styles.rewardsIcon}
        src="images/icons/iconEvolveStone.png"
        alt="ascension icon"
      /><Text
        as="span"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>/h</Text
      >
    </div>
    <div class={styles.rewardsValues}>
      <Text
        textAlign="center"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>{getIdleKingdomNumberFormat(rewards.gold)}</Text
      >
      <img
        loading="lazy"
        class={styles.rewardsIcon}
        src="images/icons/iconGold.png"
        alt="gold icon"
      /><Text
        as="span"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>/h</Text
      >
    </div>
    <div class={styles.rewardsValues}>
      <Text
        textAlign="center"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>{getIdleKingdomNumberFormat(rewards.soulstone)}</Text
      >
      <img
        loading="lazy"
        class={styles.rewardsIcon}
        src="images/icons/iconSoul.png"
        alt="gold icon"
      /><Text
        as="span"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>/h</Text
      >
    </div>
    <div class={styles.rewardsValues}>
      <Text
        textAlign="center"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>{getIdleKingdomNumberFormat(rewards.evolve * 12)}</Text
      >
      <img
        loading="lazy"
        class={styles.rewardsIcon}
        src="images/icons/iconEvolveStone.png"
        alt="ascension icon"
      /><Text
        as="span"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>/12h</Text
      >
    </div>
    <div class={styles.rewardsValues}>
      <Text
        textAlign="center"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>{getIdleKingdomNumberFormat(rewards.gold * 12)}</Text
      >
      <img
        loading="lazy"
        class={styles.rewardsIcon}
        src="images/icons/iconGold.png"
        alt="gold icon"
      /><Text
        as="span"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>/12h</Text
      >
    </div>
    <div class={styles.rewardsValues}>
      <Text
        textAlign="center"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>{getIdleKingdomNumberFormat(rewards.soulstone * 12)}</Text
      >
      <img
        loading="lazy"
        class={styles.rewardsIcon}
        src="images/icons/iconSoul.png"
        alt="gold icon"
      /><Text
        as="span"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>/12h</Text
      >
    </div>
  </div>
</div>
<div class={styles.sortContainer}>
  <Text fontWeight="bold">Sort by:</Text>
  <label class={styles.input}>
    <input
      type="radio"
      name="sort-mode"
      value={SortModes.byReward}
      checked={selectedSortMode === SortModes.byReward}
      on:change={onChangeSortMode}
    />
    <Text>by Reward</Text>
  </label>
  <label class={styles.input}>
    <input
      type="radio"
      name="sort-mode"
      value={SortModes.byKingdom}
      checked={selectedSortMode === SortModes.byKingdom}
      on:change={onChangeSortMode}
    />
    <Text>by Kingdom</Text>
  </label>
</div>
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
            sm: 16,
            md: 24,
          },
        }),
      ].join(' ')}
    >
      <Text as="span" fontSize={{ sm: 'xs', md: 'sm' }} textAlign="center"
        >{kingdom.continent} {kingdomNameToRomanNumber(kingdom.name)}</Text
      >
    </div>
    <Text textAlign="center">{kingdom.rewardEvolve}</Text>
    <Text textAlign="center">{kingdom.rewardGold.toLocaleString()}</Text>
    <div
      class={[
        styles.centerFlex,
        sprinkles({
          gap: 2,
        }),
      ].join(' ')}
    >
      <Button type="button" on:click={() => onSelectKingdomToEditFortres(kingdom)}>
        <Icon className={styles.buttonIcon} src={FaBrandsFortAwesome} color={theme.colors.white} />
      </Button>
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

<ModalEditKingdomFortress
  open={isModalEditKingdomFortresOpen}
  kingdom={selectedKingdomId}
  onClose={onCloseModalEditKingdomFortress}
/>
