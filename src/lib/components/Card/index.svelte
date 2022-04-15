<script lang="ts">
  import * as styles from './index.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import CardBorder from '$lib/components/CardBorder/index.svelte';
  import { getIdleKingdomNumberFormat } from '$lib/utils';
  import { match } from 'oxide.ts/dist';
  export let width: Sprinkles['width'] = 24;
  export let value: number = 0;
  export let cardType: CardType;
  export let decimalNumbers: number = 0;

  let imageInfo = match(cardType, [
    ['coin', { src: 'images/icons/iconGold.png', alt: 'Gold Coin Icon' }],
    ['soulstone', { src: 'images/icons/iconSoul.png', alt: 'Soulstone Icon' }],
    ['steel', { src: 'images/icons/iconIron.png', alt: 'Steel Icon' }],
    ['ascension-stone', { src: 'images/icons/iconEvolveStone.png', alt: 'Ascension Stone Icon' }],
    ['hero-seal', { src: 'images/icons/iconScrollHero.png', alt: 'Hero Seal Icon' }],
    ['gear-seal', { src: 'images/icons/iconScrollRune.png', alt: 'Gear Seal Icon' }],
    ['rune-seal', { src: 'images/icons/iconScrollSanctuary.png', alt: 'Gear Seal Icon' }],
    () => ({ src: 'none', alt: 'none' }),
  ]);
</script>

<CardBorder {width}>
  <div class={styles.teste}>
    <div class={styles.imgContainer}>
      {#if imageInfo.src !== 'none'}
        <img loading="lazy" class={styles.img} src={imageInfo.src} alt={imageInfo.alt} />
      {/if}
    </div>
    <div class={styles.textContainer}>
      <span>{getIdleKingdomNumberFormat(value, decimalNumbers)}</span>
    </div>
  </div>
</CardBorder>
