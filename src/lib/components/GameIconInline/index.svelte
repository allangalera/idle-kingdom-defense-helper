<script>
  import { match } from 'oxide.ts';

  import * as styles from './index.css';

  export let name;

  let imgInfo = match(name, [
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
    ['expedition-icon', { src: '/images/icons/iconCoinRaid.png', alt: 'Expedition Coin' }],
    ['ruin-icon', { src: '/images/icons/iconCoinRuin.png', alt: 'Ruins Coin' }],
    ['common-star', { src: '/images/icons/iconStarBig1.png', alt: 'Common Star' }],
    ['uncommon-star', { src: '/images/icons/iconStarBig2.png', alt: 'Common Star' }],
    ['rare-star', { src: '/images/icons/iconStarBig3.png', alt: 'Common Star' }],
    ['epic-star', { src: '/images/icons/iconStarBig4.png', alt: 'Common Star' }],
    ['legendary-star', { src: '/images/icons/iconStarBig5.png', alt: 'Common Star' }],
    ['mythic-star', { src: '/images/icons/iconStarBig6.png', alt: 'Common Star' }],
    ['magic-dust', { src: '/images/icons/sprAdShopMagicDust.png', alt: 'Magic Dust' }],
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

<img loading="lazy" src={imgInfo.src} alt={imgInfo.alt} class={styles.img} />
