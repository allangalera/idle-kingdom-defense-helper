<script lang="ts">
  import ConquestTableItem from '$lib/components/ConquestTableItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { CONQUEST_REWARD_MULTIPLE_PERGRADE, fortress, kingdoms } from '$lib/db/conquest';
  import { defaultSortingHeroes, heroes } from '$lib/db/heroes';
  import { conquest } from '$lib/shared/stores/user/conquest';
  import { heroes as heroesStore } from '$lib/shared/stores/user/heroes';
  import type { Hero } from '$lib/types';
  import { getIdleKingdomNumberFormat } from '$lib/utils';
  import { sortKingdomByAscensionStoneAndCoin, sortKingdomById } from '$lib/utils/conquest';
  import * as R from 'remeda';

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

  function onChangeSortMode(event) {
    const { value } = event.target;
    selectedSortMode = value;
  }

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

<Heading textAlign="center" fontSize="3xl">Conquest Rewards</Heading>
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
    <div class={styles.rewardsValues}>
      <Text
        textAlign="center"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>{getIdleKingdomNumberFormat(rewards.evolve * 24)}</Text
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
        }}>/24h</Text
      >
    </div>
    <div class={styles.rewardsValues}>
      <Text
        textAlign="center"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>{getIdleKingdomNumberFormat(rewards.gold * 24)}</Text
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
        }}>/24h</Text
      >
    </div>
    <div class={styles.rewardsValues}>
      <Text
        textAlign="center"
        fontSize={{
          sm: 'sm',
          md: 'base',
        }}>{getIdleKingdomNumberFormat(rewards.soulstone * 24)}</Text
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
        }}>/24h</Text
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
<div class={styles.itemsContainer}>
  {#each userKingdomsAndHeroes as kingdom (kingdom.id)}
    <ConquestTableItem kingdomId={kingdom.id} heroSuggestion={kingdom.heroSuggestion} />
  {/each}
</div>
