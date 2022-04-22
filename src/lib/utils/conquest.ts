import { sortWith, descend, prop, ascend } from 'ramda';
import { romanize } from './index';

export const sortKingdomByAscensionStoneAndCoin = sortWith([
  descend(prop('rewardEvolve')),
  descend(prop('rewardGold')),
]);

export const sortKingdomById = sortWith([ascend(prop('id'))]);

export const kingdomNameToRomanNumber = (kingdomName: string) => {
  const kingdomNumber = +kingdomName.replace('Kingdom', '');
  return romanize(kingdomNumber);
};
