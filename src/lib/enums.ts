export const BaseGradeToTier = {
	1: 'C',
	2: 'B',
	3: 'A',
	4: 'S',
};
export enum HeroTypes {
	support = 'Support',
	warrior = 'Warrior',
}

export const UnitTypeToHeroType = {
	1: HeroTypes.support,
	2: HeroTypes.warrior,
};

export enum RarityEnum {
	common = 'common',
	uncommon = 'uncommon',
	rare = 'rare',
	epic = 'epic',
	legendary = 'legendary',
	mythic = 'mythic',
}

export enum HeroGearEquip {
	weapon = 'weapon',
	chest = 'chest',
	helmet = 'helmet',
	boots = 'boots',
}

export enum ArcherGearEquip {
	bow = 'bow',
	arrow = 'arrow',
	helmet = 'helmet',
	chest = 'chest',
	gloves = 'gloves',
	boots = 'boots',
}
