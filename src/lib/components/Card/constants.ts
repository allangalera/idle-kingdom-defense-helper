import type { CardTypeData } from './type';

export const CARD_TYPES = {
	AscensionStone: 'ascension-stone',
	Coin: 'coin',
	Soulstone: 'soulstone',
	Steel: 'steel',
	HeroSeal: 'hero-seal',
	GearSeal: 'gear-seal',
	RuneSeal: 'rune-seal',
	Def: 'def',
	AncientCoin: 'ancient-coin',
	PortalIcon: 'portal-icon',
	Ruby: 'ruby',
	ScrollArmorNormal: 'scroll-armor-normal',
	ScrollArmorShiny: 'scroll-armor-shiny',
	ScrollWeaponNormal: 'scroll-weapon-normal',
	ScrollWeaponShiny: 'scroll-weapon-shiny',
	ProtectArmorNormal: 'protect-armor-normal',
	ProtectArmorShiny: 'protect-armor-shiny',
	ProtectWeaponNormal: 'protect-weapon-normal',
	ProtectWeaponShiny: 'protect-weapon-shiny',
} as const;

export const CART_TYPES_IMAGE_DATA: CardTypeData = {
	[CARD_TYPES.Coin]: { src: '/images/icons/iconGold.png', alt: 'Gold coin' },
	[CARD_TYPES.Soulstone]: { src: '/images/icons/iconSoul.png', alt: 'Soulstone' },
	[CARD_TYPES.Steel]: { src: '/images/icons/iconIron.png', alt: 'Steel' },
	[CARD_TYPES.AscensionStone]: {
		src: '/images/icons/iconEvolveStone.png',
		alt: 'Ascension stone',
	},
	[CARD_TYPES.HeroSeal]: { src: '/images/icons/iconScrollHero.png', alt: 'Hero seal' },
	[CARD_TYPES.GearSeal]: { src: '/images/icons/iconScrollRune.png', alt: 'Gear seal' },
	[CARD_TYPES.RuneSeal]: { src: '/images/icons/iconScrollSanctuary.png', alt: 'Gear seal' },
	[CARD_TYPES.Def]: { src: '/images/icons/iconDef.png', alt: 'Defense' },
	[CARD_TYPES.AncientCoin]: { src: '/images/icons/iconHeroCoin.png', alt: 'Ancient coin' },
	[CARD_TYPES.Ruby]: { src: '/images/icons/iconRuby.png', alt: 'Ruby' },
	[CARD_TYPES.PortalIcon]: { src: '/images/icons/iconCoinPortal.png', alt: 'Portal' },
	[CARD_TYPES.ScrollArmorNormal]: {
		src: '/images/icons/iconArmorEnchantScrollNor.png',
		alt: 'Armor enchant scroll',
	},
	[CARD_TYPES.ScrollArmorShiny]: {
		src: '/images/icons/iconArmorEnchantScrollShiny.png',
		alt: 'Armor enchant scroll shiny',
	},
	[CARD_TYPES.ScrollWeaponNormal]: {
		src: '/images/icons/iconWeaponEnchantScrollNor.png',
		alt: 'Weapon enchant scroll',
	},
	[CARD_TYPES.ScrollWeaponShiny]: {
		src: '/images/icons/iconWeaponEnchantScrollShiny.png',
		alt: 'Weapon enchant scroll shiny',
	},
	[CARD_TYPES.ProtectArmorNormal]: {
		src: '/images/icons/iconArmorProtectStoneNor.png',
		alt: 'Armor protect stone',
	},
	[CARD_TYPES.ProtectArmorShiny]: {
		src: '/images/icons/iconArmorProtectStoneShiny.png',
		alt: 'Armor protect stone shiny',
	},
	[CARD_TYPES.ProtectWeaponNormal]: {
		src: '/images/icons/iconWeaponProtectStoneNor.png',
		alt: 'Weapon protect stone',
	},
	[CARD_TYPES.ProtectWeaponShiny]: {
		src: '/images/icons/iconWeaponProtectStoneShiny.png',
		alt: 'Weapon protect stone shiny',
	},
};
