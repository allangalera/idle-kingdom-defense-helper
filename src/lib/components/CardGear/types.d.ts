type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

type UpgradeLevel = 1 | 2 | 3 | 4 | 5;

type HeroType = 'warrior' | 'support';

type HeroGear = {
	type: 'hero';
	equip: 'all' | 'weapon' | 'chest' | 'helmet' | 'boots';
	rarity: Rarity;
	level: UpgradeLevel;
};

type ArcherGear = {
	type: 'archer';
	equip: 'bow' | 'arrow' | 'helmet' | 'chest' | 'gloves' | 'boots';
	rarity: Rarity;
	level: UpgradeLevel;
};

type Blueprint = {
	type: 'blueprint';
	equip: 'all' | 'bow' | 'arrow' | 'helmet' | 'chest' | 'gloves' | 'boots';
	rarity: Rarity;
	level: UpgradeLevel;
};

type CardGearType = HeroGear | ArcherGear | Blueprint;
