import { ARCHER_EQUIP_MAX_GRADE, archerItemType, archerItems } from '$lib/db/archer';
import { ArcherGearEquip } from '$lib/types/enums';
import { returnAbilityName } from './abilities';
import { z } from 'zod';

export const getEquipData = (equip: keyof typeof ArcherGearEquip, grade: number, tier: number) => {
	const schema = z.object({
		equip: z.nativeEnum(ArcherGearEquip),
		grade: z.number().gte(1).lte(ARCHER_EQUIP_MAX_GRADE),
		tier: z.number().gte(0).lte(3),
	});

	const validation = schema.safeParse({ equip, grade, tier });

	if (!validation.success) return;

	const type = getEquipType(equip);

	const equipData = archerItems.find((item) => item.type === type && item.grade === grade);

	if (!equipData) return;

	return {
		...equipData,
		statTypeName: returnAbilityName(equipData.statType),
		statSubName: returnAbilityName(equipData.statSub),
		statInitValue: equipData.statInitValues[tier],
		statIncValue: equipData.statIncValues[tier],
		subInitValue: equipData.subInitValues[tier],
	};
};

export const getEquipType = (equip: keyof typeof ArcherGearEquip) => {
	return archerItemType[equip];
};
