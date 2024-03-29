export const BaseGradeToTier = {
  1: 'C',
  2: 'B',
  3: 'A',
  4: 'S',
};

export enum HeroTypes {
  support = 'support',
  warrior = 'warrior',
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

export const HeroGearEquipOptions = {
  weapon: 'weapon',
  chest: 'chest',
  helmet: 'helmet',
  boots: 'boots',
} as const;

export const Attributes = {
  atk: 'atk',
  atkP: 'atk%',
  atkSpeed: 'atkSpeed',
  cri: 'cri',
  criDamage: 'criDamage',
  criDamageResist: 'criDamageResist',
  criResist: 'criResist',
  def: 'def',
  defP: 'def%',
  defPierce: 'defPierce',
  defPierceResist: 'defPierceResist',
  dodge: 'dodge',
  hit: 'hit',
  hp: 'hp',
  hpP: 'hp%',
  moveSpeed: 'moveSpeed',
  supporterAtk: 'supporterAtk',
  warriorAtk: 'warriorAtk',
  supporterSkillDmg: 'supporterSkillDmg',
  warriorSkillDmg: 'warriorSkillDmg',
} as const;

export type HeroGearEquipTypes = keyof typeof HeroGearEquipOptions;

export enum HeroGearEquip {
  weapon = 'weapon',
  chest = 'chest',
  helmet = 'helmet',
  boots = 'boots',
}

export const ArcherGearEquip = {
  bow: 'bow',
  arrow: 'arrow',
  helmet: 'helmet',
  chest: 'chest',
  gloves: 'gloves',
  boots: 'boots',
} as const;

export enum HeroesVisualizationModes {
  compact = 'compact',
  minimal = 'minimal',
}

export enum HeroesSearchValues {
  name = 'name',
  skillName = 'skills.*.name',
  skillDescription = 'skills.*.desc',
}
