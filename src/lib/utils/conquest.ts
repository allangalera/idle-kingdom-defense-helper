import { sortWith, descend, prop } from 'ramda';

export const sortKingdomByAscensionStoneAndCoin = sortWith([
	descend(prop('rewardEvolve')),
	descend(prop('rewardGold')),
]);
