import gStageJson from '$lib/gameInfo/stage.json';
import gStagePoolJson from '$lib/gameInfo/stagePool.json';

export const generateGStagePool = () => {
  const _gStagePool = {};
  const gStagePoolJsonLength = gStagePoolJson.length;
  for (let i = 0; i < gStagePoolJsonLength; i++) {
    const currentStagePool = gStagePoolJson[i];
    if (!_gStagePool[currentStagePool.poolId]) {
      _gStagePool[currentStagePool.poolId] = {};
    }

    if (!_gStagePool[currentStagePool.poolId][currentStagePool.setId]) {
      _gStagePool[currentStagePool.poolId][currentStagePool.setId] = [];
    }

    _gStagePool[currentStagePool.poolId][currentStagePool.setId].push(currentStagePool);
  }

  return _gStagePool;
};

const _gStagePool = generateGStagePool();

export const getEnemyIdFromStage = (stage: number) => {
  if (stage === 0) return;
  const gStageJsonLength = gStageJson.length;

  let stageData = gStageJson[0];
  for (let i = 1; i < gStageJsonLength; i++) {
    const currentStageData = gStageJson[i];
    if (currentStageData.lv <= stage) {
      stageData = currentStageData;
    } else {
      break;
    }
  }

  if (!stageData) return;
  const dLv = stage - stageData.lv;
  const stagePool = _gStagePool[stageData.poolId];
  const setCnt = Object.keys(stagePool).length;
  const setIdx = (dLv % setCnt) + 1;
  const selectedStageSet = stagePool[setIdx];

  return {
    stageData,
    selectedStageSet,
  };
};
