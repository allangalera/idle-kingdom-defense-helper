<script lang="ts">
  import CardBorder from '$lib/components/CardBorder/index.svelte';
  import CardHero from '$lib/components/CardHero/index.svelte';
  import ModalEditKingdomFortress from '$lib/components/ModalEditKingdomFortress/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { fortress, kingdoms } from '$lib/db/conquest';
  import { addKingdom, conquest, removeKingdom } from '$lib/shared/stores/user/conquest';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { theme } from '$lib/styles/themes/index.css';
  import { kingdomNameToRomanNumber } from '$lib/utils/conquest';
  import Icon from 'svelte-icons-pack';
  import FaBrandsFortAwesome from 'svelte-icons-pack/fa/FaBrandsFortAwesome';
  import RiSystemAddFill from 'svelte-icons-pack/ri/RiSystemAddFill';
  import RiSystemDeleteBinFill from 'svelte-icons-pack/ri/RiSystemDeleteBinFill';

  import * as styles from './index.css';

  export let kingdomId: number;
  export let heroSuggestion;

  let kingdomData;
  let userKingdoms;
  let userFortress;
  let userHasKingdom;
  let userFortressData = [];
  let isModalEditFortressOpen = false;

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

  const getKingdomData = () => {
    kingdomData = kingdoms.find((item) => item.id === kingdomId);
    userHasKingdom = userKingdoms.some((item) => item === kingdomId);
    userFortressData = kingdomData.fortressIds.map((fortId) => {
      let userFort = userFortress.find((item) => item.id === fortId);
      return {
        id: fortId,
        level: userFort ? userFort.level : 0,
      };
    });
  };

  const add = () => {
    addKingdom(kingdomId);
  };

  const remove = () => {
    removeKingdom(kingdomId);
  };

  const onOpenModalEditFortress = () => {
    isModalEditFortressOpen = true;
  };

  const onCloseModalEditFortress = () => {
    isModalEditFortressOpen = false;
  };

  conquest.subscribe((value) => {
    userKingdoms = value?.kingdoms ?? [];
    userFortress = value?.fortress ?? [];
  });

  $: kingdomId && userKingdoms && userFortress && getKingdomData();
</script>

<div class={styles.container}>
  <div class={styles.leftContainer}>
    <div
      class={[
        styles.kingdomName,
        sprinkles({
          background: backgroundByContinent[kingdomData.continentId],
          borderColor: borderColorByContinent[kingdomData.continentId],
        }),
      ].join(' ')}
    >
      <Text fontSize="xs">{kingdomData.continent}</Text>
      <Text fontSize="xs">{kingdomNameToRomanNumber(kingdomData.name)}</Text>
    </div>
    <div class={styles.rewardsContainer}>
      <div class={styles.rewardsItem}>
        <img
          loading="lazy"
          class={styles.rewardIcons}
          src="images/icons/iconEvolveStone.png"
          alt="ascension icon"
        />
        <div class={styles.rewardInfo}>
          <Text textAlign="center">{kingdomData.rewardEvolve}</Text>
        </div>
      </div>
      <div class={styles.rewardsItem}>
        <img
          loading="lazy"
          class={styles.rewardIcons}
          src="images/icons/iconGold.png"
          alt="gold icon"
        />
        <div class={styles.rewardInfo}>
          <Text textAlign="center" fontSize="sm">{kingdomData.rewardGold.toLocaleString()}</Text>
        </div>
      </div>
    </div>
    <div class={styles.fortInfoContainer}>
      <Text textAlign="center">Forts</Text>
      <div class={styles.fortContainer}>
        {#each userFortressData as fort (fort.id)}
          <div class={styles.fortItemVariant[fort.level ? 'have' : 'dontHave']}>
            <div class={styles.fortTextContainerVariant[fort.level ? 'have' : 'dontHave']}>
              <Text fontSize="xs">{fort.level}</Text>
            </div>
          </div>
        {/each}
      </div>
    </div>
    {#if heroSuggestion}
      <CardHero hero={heroSuggestion} width={12} heroTypeBadgeWidth={3.5} borderWidth={0.5} />
    {:else}
      <CardBorder width={12} borderWidth={0.5} />
    {/if}
  </div>
  <div class={styles.rightContainer}>
    <div
      class={styles.actionButtonVariant.primary}
      role="button"
      on:click={onOpenModalEditFortress}
    >
      <Icon className={styles.buttonIcons} src={FaBrandsFortAwesome} color={theme.colors.white} />
    </div>
    {#if userHasKingdom}
      <div class={styles.actionButtonVariant.danger} role="button" on:click={remove}>
        <Icon
          className={styles.buttonIcons}
          src={RiSystemDeleteBinFill}
          color={theme.colors.white}
        />
      </div>
    {:else}
      <div class={styles.actionButtonVariant.success} role="button" on:click={add}>
        <Icon className={styles.buttonIcons} src={RiSystemAddFill} color={theme.colors.white} />
      </div>
    {/if}
  </div>
</div>

<ModalEditKingdomFortress
  open={isModalEditFortressOpen}
  kingdom={kingdomData}
  onClose={onCloseModalEditFortress}
/>
