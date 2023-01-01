import { getTranslation } from '$lib/db/lang';
import { Attributes } from '$lib/types/enums';
import { match } from 'oxide.ts';

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

export const returnAbilityName = (id: number) => {
	return getTranslation(`ABILITY_NAME_${id}`);
};

export const returnAbilityAttributeName = (id: Abilities) => {
	return match(id, [
		[1, Attributes.atkSpeed],
		[2, Attributes.atk],
		[3, Attributes.def],
		[4, Attributes.defPierce],
		[5, Attributes.moveSpeed],
		[6, Attributes.cri],
		[7, Attributes.criResist],
		[8, Attributes.criDamage],
		[9, Attributes.hit],
		[10, Attributes.dodge],
		[11, Attributes.hp],
		[12, Attributes.criDamageResist],
		[13, Attributes.defPierceResist],
		[14, Attributes.supporterAtk],
		[15, Attributes.warriorAtk],
		[16, Attributes.supporterSkillDmg],
		[17, Attributes.warriorSkillDmg],
		[33, Attributes.atkP],
		[32, Attributes.hpP],
		[34, Attributes.defP],
		() => '',
	]);
};
