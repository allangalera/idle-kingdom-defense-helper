import { ArcherGearEquip } from '$lib/enums';
import archerConstJSON from '$lib/gameInfo/archerConst.json';
import archerItemJSON from '$lib/gameInfo/archerItem.json';
import langJSON from '$lib/gameInfo/lang.json';
import * as R from 'remeda';

export const archerItemType = {
  [ArcherGearEquip.bow]: 1,
  [ArcherGearEquip.arrow]: 2,
  [ArcherGearEquip.helmet]: 3,
  [ArcherGearEquip.chest]: 4,
  [ArcherGearEquip.gloves]: 5,
  [ArcherGearEquip.boots]: 6,
};

export const archerItems = archerItemJSON.map((item) => {
  return {
    ...item,
    name: langJSON[item.name],
  };
});

export const archerPromoteProgressionByGrade = archerItemJSON.reduce((prev, curr) => {
  if (curr.type === 1) return R.merge(prev, { [curr.grade]: curr.promoteCost });
  return prev;
}, {});

const generateArcherPromoteStageRequirements = () => {
  const unlock = {
    1: 0,
  };

  archerConstJSON.PROMOTE.LIMIT_STAGE.forEach((stage, index) => {
    const grade = index + 2;
    if (grade > archerConstJSON.PROMOTE.MAXGRADE) return;
    unlock[grade] = stage;
  });

  return unlock;
};

export const archerPromoteStageRequirements = generateArcherPromoteStageRequirements();
