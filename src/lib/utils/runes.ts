import { runes, runesMap } from '$lib/db/runes';
import { Attributes } from '$lib/types/enums';
import { match } from 'oxide.ts';

export const returnRuneAttribute = (attr: number) => {
	return match(attr, [
		[8, Attributes.criDamage],
		[2, Attributes.atk],
		[6, Attributes.cri],
		[10, Attributes.dodge],
		[1, Attributes.atkSpeed],
		[11, Attributes.hp],
		[4, Attributes.defPierce],
		[3, Attributes.def],
		[7, Attributes.criResist],
		[9, Attributes.hit],
		[5, Attributes.moveSpeed],
		[13, Attributes.defPierceResist],
		[12, Attributes.criDamageResist],
		() => '',
	]);
};

export const returnRuneCurrentMinMax = (runeId: number, userRuneData) => {
	const result = {
		min: 0,
		max: 0,
	};

	const rune = runesMap.get(runeId);

	if (!rune || !userRuneData) return result;

	return {
		min: rune.abilityInitMin + userRuneData.enchant * rune.abilityIncMin,
		max: rune.abilityInitMax + userRuneData.enchant * rune.abilityIncMax,
	};
};
