<script lang="ts">
  import CardBorder from '$lib/components/CardBorder/index.svelte';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { getIdleKingdomNumberFormat } from '$lib/utils';
  import { match } from 'oxide.ts';

  import type { CardType } from './card';
  import * as styles from './index.css';

  export let width: Sprinkles['width'] = 24;
  export let value = 0;
  export let cardType: CardType;
  export let decimalNumbers = 0;

  let imageInfo = match(cardType, [
    ['coin', { src: '/images/icons/iconGold.png', alt: 'Gold Coin Icon' }],
    ['soulstone', { src: '/images/icons/iconSoul.png', alt: 'Soulstone Icon' }],
    ['steel', { src: '/images/icons/iconIron.png', alt: 'Steel Icon' }],
    ['ascension-stone', { src: '/images/icons/iconEvolveStone.png', alt: 'Ascension Stone Icon' }],
    ['hero-seal', { src: '/images/icons/iconScrollHero.png', alt: 'Hero Seal Icon' }],
    ['gear-seal', { src: '/images/icons/iconScrollRune.png', alt: 'Gear Seal Icon' }],
    ['rune-seal', { src: '/images/icons/iconScrollSanctuary.png', alt: 'Gear Seal Icon' }],
    ['def', { src: '/images/icons/iconDef.png', alt: 'Def Icon' }],
    ['ancient-coin', { src: '/images/icons/iconHeroCoin.png', alt: 'Ancient Coin Icon' }],
    ['ruby', { src: '/images/icons/iconRuby.png', alt: 'Def Icon' }],
    ['portal-icon', { src: '/images/icons/iconCoinPortal.png', alt: 'Def Icon' }],
    [
      'scroll-armor-normal',
      { src: '/images/icons/iconArmorEnchantScrollNor.png', alt: 'Armor Scroll Normal Icon' },
    ],
    [
      'scroll-armor-shiny',
      { src: '/images/icons/iconArmorEnchantScrollShiny.png', alt: 'Armor Scroll Shiny Icon' },
    ],
    [
      'scroll-weapon-normal',
      { src: '/images/icons/iconWeaponEnchantScrollNor.png', alt: 'Weapon Scroll Normal Icon' },
    ],
    [
      'scroll-weapon-shiny',
      { src: '/images/icons/iconWeaponEnchantScrollShiny.png', alt: 'Weapon Scroll Shiny Icon' },
    ],
    [
      'protect-armor-normal',
      { src: '/images/icons/iconArmorProtectStoneNor.png', alt: 'Armor Scroll Normal Icon' },
    ],
    [
      'protect-armor-shiny',
      { src: '/images/icons/iconArmorProtectStoneShiny.png', alt: 'Armor Scroll Shiny Icon' },
    ],
    [
      'protect-weapon-normal',
      { src: '/images/icons/iconWeaponProtectStoneNor.png', alt: 'Weapon Scroll Normal Icon' },
    ],
    [
      'protect-weapon-shiny',
      { src: '/images/icons/iconWeaponProtectStoneShiny.png', alt: 'Weapon Scroll Shiny Icon' },
    ],
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
