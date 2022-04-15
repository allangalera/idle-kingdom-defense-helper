import gStageJson from '$lib/gameInfo/stage.json';
import gStagePoolJson from '$lib/gameInfo/stagePool.json';
import * as R from 'remeda';

type GStagePool = Record<number, Record<number, typeof gStagePoolJson[number][]>>;

export const generateGStagePool = (): GStagePool => {
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

export const _gStagePool = generateGStagePool();

export const generateUniqueStagePools = () => {
  const uniqueEnemies = new Map<number, number>();
  R.forEachObj(_gStagePool, (val) => {
    R.forEachObj(val, (val) => {
      val.reduce((curr, prev) => {
        if (prev.unitType === 6) return null;
        uniqueEnemies.set(prev.unitId, prev.unitId);
      });
    });
  });
  console.log(uniqueEnemies);
  return R.sort(Array.from(uniqueEnemies.values()), (a, b) => a - b);
};

export const uniqueEnemies = generateUniqueStagePools();

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
