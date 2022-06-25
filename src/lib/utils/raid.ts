import { raidConst } from '$lib/db/raid';
import { shopConst } from '$lib/db/shop';
import { match } from 'oxide.ts';

import { returnRewardDataByStage } from './stage';

const getRewardByType = (itemType, rewardData, raidInfo) => {
  return match(itemType, [
    [
      102,
      Math.floor(
        (rewardData.idle.goldInit +
          rewardData.idle.goldInc * (raidInfo.difficultyStage - rewardData.idle.lv)) *
          (1 + shopConst.EFFECTOR_DATA_IDLE_GOLD.slice(-1)[0])
      ) * raidConst.REWARDINFO.TIC,
    ],
    [
      27,
      Math.floor(
        (rewardData.idle.soulInit +
          rewardData.idle.soulInc * (raidInfo.difficultyStage - rewardData.idle.lv)) *
          (1 + shopConst.EFFECTOR_DATA_IDLE_SOUL.slice(-1)[0])
      ) * raidConst.REWARDINFO.TIC,
    ],
    [
      24,
      Math.floor(
        rewardData.idle.evolve.init +
          rewardData.idle.evolve.inc * (raidInfo.difficultyStage - rewardData.idle.lv)
      ) * raidConst.REWARDINFO.TIC_ITEM,
    ],
    [
      31,
      Math.floor(
        rewardData.idle.hscroll.init +
          rewardData.idle.hscroll.inc * (raidInfo.difficultyStage - rewardData.idle.lv)
      ) * raidConst.REWARDINFO.TIC_ITEM,
    ],
    [
      32,
      Math.floor(
        rewardData.idle.rscroll.init +
          rewardData.idle.rscroll.inc * (raidInfo.difficultyStage - rewardData.idle.lv)
      ) * raidConst.REWARDINFO.TIC_ITEM,
    ],
    () => 0,
  ]);
};

export const returnRaidRewards = (raidInfo) => {
  const rewardData = returnRewardDataByStage(raidInfo.difficultyStage);
  const rewards = [];
  for (const reward of raidConst.REWARDINFO.REWARD.ITEM_TYPES) {
    rewards.push({
      t: reward,
      c: getRewardByType(reward, rewardData, raidInfo),
    });
  }
  for (const reward of raidInfo.rewardInfo.rewards) {
    console.log(reward);
  }
  console.log(rewards);
  return rewards;
};
