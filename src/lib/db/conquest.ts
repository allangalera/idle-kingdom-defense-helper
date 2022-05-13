import conquestConstJSON from '$lib/gameInfo/conquestConst.json';
import conquestContinentsJSON from '$lib/gameInfo/conquestContinents.json';
import conquestFortressJSON from '$lib/gameInfo/conquestFortress.json';
import conquestKingdomsJSON from '$lib/gameInfo/conquestKingdoms.json';
import langJSON from '$lib/gameInfo/lang.json';

const generateKingdoms = () => {
  return conquestKingdomsJSON.map((kingdom) => {
    const continent = conquestContinentsJSON.find((continent) =>
      continent.kingdomIds.includes(kingdom.id)
    );

    return {
      ...kingdom,
      continent: langJSON[continent.name].replace(/continent/i, '').trim(),
      continentId: continent.id,
      name: langJSON[kingdom.name],
    };
  });
};

export const kingdoms = generateKingdoms();
export const fortress = conquestFortressJSON;

export const CONQUEST_REWARD_MULTIPLE_PERGRADE = conquestConstJSON.CAPITAL.REWARD_MULTIPLE_PERGRADE;
export const CONQUEST_FORTRESS_MAX_LEVEL = conquestConstJSON.FORTRESS.MAX_LV;
