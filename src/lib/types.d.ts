import { RarityEnum, HeroGearEquip, ArcherGearEquip } from './enums';

type Rarity = keyof typeof RarityEnum;

type UpgradeLevel = 1 | 2 | 3 | 4 | 5;

export enum Hero {
	warrior = 'warrior',
	support = 'support',
}

type HeroType = keyof typeof Hero;

type HeroGear = {
	type: 'hero';
	equip: 'all' | keyof typeof HeroGearEquip;
	rarity: Rarity;
	level: UpgradeLevel;
};

type ArcherGear = {
	type: 'archer';
	equip: keyof typeof ArcherGearEquip;
	rarity: Rarity;
	level: UpgradeLevel;
};

type Blueprint = {
	type: 'blueprint';
	equip: 'all' | keyof typeof ArcherGearEquip;
	rarity: Rarity;
	level: UpgradeLevel;
};

type CardGearType = HeroGear | ArcherGear | Blueprint;

type BestGearType = {
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
