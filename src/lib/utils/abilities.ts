import langJSON from '$lib/gameInfo/lang.json';

export const AbilitiesTypes = {
  CRIREGIST: 7,
  WARRIORATK: 15,
  HIT: 9,
  HP_P: 32,
  ESHOCK: 23,
  CASTLE_DEF: 502,
  ATKSPEED: 1,
  FREEZE: 24,
  DEF: 3,
  BURN: 21,
  DMGUPCASTLE: 300,
  WARRIORSKILLDMG: 17,
  DMGREGARCHER: 200,
  ATK: 2,
  JUMP: 102,
  MOVESPEED: 5,
  CRI: 6,
  DEBUFFIMMUNE: 400,
  DEFPIERCEREG: 13,
  DODGE: 10,
  SUPPORTERATK: 14,
  HP: 11,
  DEFPIERCE: 4,
  HEAL: 51,
  SUPPORTERSKILLDMG: 16,
  CRIDAMAGEREG: 12,
  DEF_P: 34,
  DMGREGSUPPOTER: 201,
  CRIDAMAGE: 8,
  KNOCKBACK: 101,
  ATK_P: 33,
  CRIDAMAGE_P: 31,
  POISON: 22,
  STUN: 103,
  CASTLE_HP: 501,
} as const;

type AbilitiesKeys = keyof typeof AbilitiesTypes;
export type Abilities = typeof AbilitiesTypes[AbilitiesKeys];

export const returnAbilityName = (id: Abilities) => langJSON[`ABILITY_NAME_${id}`];
