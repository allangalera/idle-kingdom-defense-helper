<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { fortress } from '$lib/db/conquest';
  import {
    addFortress,
    conquest,
    removeFortress,
    updateFortressLevel,
  } from '$lib/shared/stores/user/conquest';
  import { theme } from '$lib/styles/themes/index.css';
  import { getIdleKingdomNumberFormat } from '$lib/utils';
  import { match } from 'oxide.ts';
  import Icon from 'svelte-icons-pack';
  import RiSystemAddFill from 'svelte-icons-pack/ri/RiSystemAddFill';
  import RiSystemDeleteBinFill from 'svelte-icons-pack/ri/RiSystemDeleteBinFill';
  import RiSystemSubtractFill from 'svelte-icons-pack/ri/RiSystemSubtractFill';

  import * as styles from './index.css';

  export let fortressId: number;
  export let key: number;

  let currentLevel = 1;
  let fortressData;
  let userFortressData;

  let imgSrc = 'none';
  let reward;

  const onAddFortress = () => {
    addFortress({
      id: fortressId,
      level: 1,
    });
  };

  const onRemoveFortress = () => {
    removeFortress(fortressId);
  };

  const onDecrementLevel = () => {
    updateFortressLevel(fortressId, currentLevel - 1);
  };

  const onIncrementLevel = () => {
    updateFortressLevel(fortressId, currentLevel + 1);
  };

  const getFortressData = () => {
    fortressData = fortress.find((item) => item.id === fortressId);

    currentLevel = userFortressData ? userFortressData.level : 1;

    imgSrc = match(fortressData.rewardType, [
      [102, 'images/icons/iconGold.png'],
      [27, 'images/icons/iconSoul.png'],
      () => 'none',
    ]);

    reward = match(fortressData.rewardType, [
      [102, fortressData.rewardGoldInit + fortressData.rewardGoldInc * (currentLevel - 1)],
      [27, fortressData.rewardSoulInit + fortressData.rewardSoulInc * (currentLevel - 1)],
      () => 0,
    ]);
  };

  conquest.subscribe((value) => {
    userFortressData = value?.fortress?.find((item) => item.id === fortressId);
  });

  $: (fortressId || userFortressData) && getFortressData();
</script>

<div class={styles.container}>
  <div class={styles.name}>
    <Text>{key}</Text>
  </div>
  <div class={styles.centerVariant[userFortressData ? 'show' : 'hide']}>
    <div class={styles.rewards}>
      {#if imgSrc !== 'none'}
        <img class={styles.icon} src={imgSrc} alt="Coin Icon" />
      {/if}
      <Text fontSize="xs">{getIdleKingdomNumberFormat(reward ?? 0)}/10m</Text>
    </div>
    <div class={styles.level}>
      <Button on:click={onDecrementLevel}>
        <Icon
          className={styles.buttonIcons}
          src={RiSystemSubtractFill}
          color={theme.colors.white}
        />
      </Button>
      <div class={styles.levelText}>
        <Text textAlign="center">Lv {currentLevel}</Text>
      </div>
      <Button on:click={onIncrementLevel}>
        <Icon className={styles.buttonIcons} src={RiSystemAddFill} color={theme.colors.white} />
      </Button>
    </div>
  </div>
  <div class={styles.actionContainer}>
    {#if userFortressData}
      <div class={styles.actionButtonVariant.danger} role="button" on:click={onRemoveFortress}>
        <Icon
          className={styles.buttonIcons}
          src={RiSystemDeleteBinFill}
          color={theme.colors.white}
        />
      </div>
    {:else}
      <div class={styles.actionButtonVariant.success} role="button" on:click={onAddFortress}>
        <Icon className={styles.buttonIcons} src={RiSystemAddFill} color={theme.colors.white} />
      </div>
    {/if}
  </div>
</div>
