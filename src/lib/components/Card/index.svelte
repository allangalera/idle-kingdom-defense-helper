<script lang="ts">
  import * as styles from './index.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import CardBorder from '$lib/components/CardBorder/index.svelte';
  import ascensionStoneIcon from '$lib/assets/iconEvolveStone.png';
  import goldCoinIcon from '$lib/assets/iconGold.png';
  import soulstoneIcon from '$lib/assets/iconSoul.png';
  import steelIcon from '$lib/assets/iconIron.png';
  import { getIdleKingdomNumberFormat } from '$lib/utils';
  export let width: Sprinkles['width'] = 24;
  export let value: number = 0;
  export let cardType: CardType;
  export let decimalNumbers: number = 0;
</script>

<CardBorder {width}>
  <div class={styles.teste}>
    <div class={styles.imgContainer}>
      {#if cardType === 'ascension-stone'}
        <img
          loading="lazy"
          class={styles.img}
          src={ascensionStoneIcon}
          alt="Ascension Stone Icon"
        />
      {:else if cardType === 'coin'}
        <img loading="lazy" class={styles.img} src={goldCoinIcon} alt="Coin Icon" />
      {:else if cardType === 'soulstone'}
        <img loading="lazy" class={styles.img} src={soulstoneIcon} alt="Soulstone Icon" />
      {:else if cardType === 'steel'}
        <img loading="lazy" class={styles.img} src={steelIcon} alt="Steel Icon" />
      {/if}
    </div>
    <div class={styles.textContainer}>
      <span>{getIdleKingdomNumberFormat(value, decimalNumbers)}</span>
    </div>
  </div>
</CardBorder>
