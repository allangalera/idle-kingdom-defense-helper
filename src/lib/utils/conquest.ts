import * as R from 'remeda';

import { romanize } from './index';

export const sortKingdomByAscensionStoneAndCoin = R.sortBy<{
  rewardEvolve: number;
  rewardGold: number;
}>([(x) => x.rewardEvolve, 'desc'], [(x) => x.rewardGold, 'desc']);

export const sortKingdomById = R.sortBy<{
  id: number;
}>([(x) => x.id, 'asc']);

export const kingdomNameToRomanNumber = (kingdomName: string) => {
  const kingdomNumber = +kingdomName.replace('Kingdom', '');
  return romanize(kingdomNumber);
};
