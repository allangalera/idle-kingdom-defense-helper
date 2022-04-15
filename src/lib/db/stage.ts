import stageJSON from '$lib/gameInfo/stage.json';
import stagePoolJSON from '$lib/gameInfo/stagePool.json';
import stageClearRewardJSON from '$lib/gameInfo/stageClearReward.json';
import stageIdleRewardJSON from '$lib/gameInfo/stageIdleReward.json';

export const stage = stageJSON;
export const stagePool = stagePoolJSON;
export const stageClearReward = stageClearRewardJSON;
export const stageIdleReward = stageIdleRewardJSON;

const getDesignStageUnlock = () => {
  const rewards = {};
  for (const idleReward of stageIdleRewardJSON) {
    const currentLevelMaxGrade = Math.max(...idleReward.design.grades);
    if (!currentLevelMaxGrade) continue;
    if (rewards[currentLevelMaxGrade]) continue;
    rewards[currentLevelMaxGrade] = idleReward.lv;
  }
  return rewards;
};

export const designStageUnlock = getDesignStageUnlock();
