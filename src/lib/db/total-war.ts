import langJSON from '$lib/gameInfo/lang.json';
import totalwarRanksJSON from '$lib/gameInfo/totalwarRanks.json';

export const totalwarRanks = totalwarRanksJSON.map((rank) => {
  return {
    ...rank,
    name: langJSON[`TOTALWAR_RANK_${rank.rank}`],
  };
});
