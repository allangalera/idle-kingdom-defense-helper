import type {
  RarityEnum,
  HeroGearEquip,
  ArcherGearEquip,
  HeroTypes,
  HeroesVisualizationModes,
} from './enums';

export type HeroesVisualizationMode = keyof typeof HeroesVisualizationModes;

export type Rarity = keyof typeof RarityEnum;

export type UpgradeLevel = 1 | 2 | 3 | 4 | 5;

export type Grades =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;

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

export type Skill = {
  progression: any[];
};

export type Hero = {
  id: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skills: Skill[];
  grade?: Grades;
  level?: number;
  baseGrade: number;
};
