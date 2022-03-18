import type { RarityEnum, HeroGearEquip, ArcherGearEquip, HeroTypes } from './enums';

export type Rarity = keyof typeof RarityEnum;

export type UpgradeLevel = 1 | 2 | 3 | 4 | 5;

export type HeroType = keyof typeof HeroTypes;

export type HeroGear = {
	type: 'hero';
	equip: 'all' | keyof typeof HeroGearEquip;
	rarity: Rarity;
	level: UpgradeLevel;
};

export type ArcherGear = {
	type: 'archer';
	equip: keyof typeof ArcherGearEquip;
	rarity: Rarity;
	level: UpgradeLevel;
};

export type Blueprint = {
	type: 'blueprint';
	equip: 'all' | keyof typeof ArcherGearEquip;
	rarity: Rarity;
	level: UpgradeLevel;
};

export type CardGearType = HeroGear | ArcherGear | Blueprint;

export type BestGearType = {
	hero: {
		full: `hero-${Rarity}-${UpgradeLevel}`;
		rarity: Rarity;
		level: UpgradeLevel;
	};
	archer: {
		full: `archer-${Rarity}-${UpgradeLevel}`;
		rarity: Rarity;
		level: UpgradeLevel;
	};
};
