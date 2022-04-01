import langJSON from '$lib/gameInfo/lang.json';
import archerItemJSON from '$lib/gameInfo/archerItem.json';
import * as R from 'remeda';

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
