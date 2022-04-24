import { ARCHER_EQUIP_MAX_GRADE, archerItemType, archerItems } from '$lib/db/archer';
import { ArcherGearEquip } from '$lib/enums';
import langJSON from '$lib/gameInfo/lang.json';
import type { Grades } from '$lib/types';
import { z } from 'zod';

export const getEquipData = (equip: ArcherGearEquip, grade: Grades, tier) => {
  const schema = z.object({
    equip: z.nativeEnum(ArcherGearEquip),
    grade: z.number().gte(1).lte(ARCHER_EQUIP_MAX_GRADE),
    tier: z.number().gte(0).lte(3),
  });

  const validation = schema.safeParse({ equip, grade, tier });

  if (!validation.success) return;

  const type = getEquipType(equip);

  const equipData = archerItems.find((item) => item.type === type && item.grade === grade);

  return {
    ...equipData,
    statTypeName: langJSON[`ABILITY_NAME_${equipData.statType}`],
    statSubName: langJSON[`ABILITY_NAME_${equipData.statSub}`],
    statInitValue: equipData.statInitValues[tier],
    statIncValue: equipData.statIncValues[tier],
    subInitValue: equipData.subInitValues[tier],
  };
};

export const getEquipType = (equip: ArcherGearEquip) => {
  return archerItemType[equip];
};
