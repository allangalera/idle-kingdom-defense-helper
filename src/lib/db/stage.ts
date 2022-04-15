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

const getHeroGearStageUnlock = () => {
  const rewards = {};
  for (const idleReward of stageIdleRewardJSON) {
    const currentLevelMaxGrade = Math.max(...idleReward.gear.grades);
    if (!currentLevelMaxGrade) continue;
    if (rewards[currentLevelMaxGrade]) continue;
    rewards[currentLevelMaxGrade] = idleReward.lv;
  }
  return rewards;
};

const getEnemyCCResist = () => {
  const resist = {};
  for (const stage of stageJSON) {
    const currentPercentage = Math.floor(stage.debuffResist[0].percentage * 100);
    if (!currentPercentage) continue;
    if (resist[currentPercentage]) continue;
    resist[currentPercentage] = stage.lv;
  }
  return resist;
};

export const designStageUnlock = getDesignStageUnlock();
export const heroGearStageUnlock = getHeroGearStageUnlock();
export const enemyCCResist = getEnemyCCResist();
