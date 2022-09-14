import langJSON from '$lib/gameInfo/lang.json';
import totalwarDungeonsJSON from '$lib/gameInfo/totalwarDungeons.json';
import totalwarRanksJSON from '$lib/gameInfo/totalwarRanks.json';
import * as R from 'remeda';

export const totalwarRanks = totalwarRanksJSON.map((rank) => {
  return {
    ...rank,
    name: langJSON[`TOTALWAR_RANK_${rank.rank}`],
  };
});

export type RawTotalWarDungeons = typeof totalwarDungeonsJSON[number];

export const defaultSortingtotalwarDungeons = (totalwarDungeons: RawTotalWarDungeons[]) =>
  R.sortBy(
    totalwarDungeons,
    [(x) => x.bossId, 'asc'],
    [(x) => x.contId, 'asc'],
    [(x) => x.dungeonId, 'asc']
  );

export const totalwarDungeons = defaultSortingtotalwarDungeons(
  totalwarDungeonsJSON.map((dungeon) => {
    return {
      ...dungeon,
      name: langJSON[dungeon.name],
    };
  })
);
