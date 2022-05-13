import conquestConstJSON from '$lib/gameInfo/conquestConst.json';
import conquestContinentsJSON from '$lib/gameInfo/conquestContinents.json';
import conquestFortressJSON from '$lib/gameInfo/conquestFortress.json';
import conquestKingdomsJSON from '$lib/gameInfo/conquestKingdoms.json';
import langJSON from '$lib/gameInfo/lang.json';
import { match } from 'oxide.ts';

const getContinentId = (kingdomId: number) => {
  return Math.floor((kingdomId - 1) / 12 + 1);
};

const getContinentName = (kingdomId: number) => {
  return match(kingdomId, [[1, 'Green'], [2, 'Glacial'], [3, 'Rock'], () => 'Green']);
};

const generateKingdoms = () => {
  return conquestKingdomsJSON.map((kingdom) => {
    return {
      ...kingdom,
      continent: getContinentName(kingdom.id),
      continentId: getContinentId(kingdom.id),
      name: langJSON[kingdom.name],
    };
  });
};

export const kingdoms = generateKingdoms();

export const fortress = conquestFortressJSON;

export const CONQUEST_REWARD_MULTIPLE_PERGRADE = conquestConstJSON.CAPITAL.REWARD_MULTIPLE_PERGRADE;
export const CONQUEST_FORTRESS_MAX_LEVEL = conquestConstJSON.FORTRESS.MAX_LV;
