import { browser } from '$app/env';
import { is, mergeDeepRight } from 'ramda';
import * as R from 'remeda';
import { writable } from 'svelte/store';

type stageFarmCompareData = {
  id: string;
  stage: number;
  seconds: number;
};
type StageStore = {
  stage: number;
  stageFarmCompare: stageFarmCompareData[];
};

const STAGE_STORE_KEY = 'STAGE_STORE_KEY';

const initialStage = browser ? JSON.parse(window.localStorage.getItem(STAGE_STORE_KEY)) ?? {} : {};

export const stage = writable<StageStore>(initialStage);

export const updateStage = (stageLevel: number) => {
  if (!is(Number, stageLevel)) return false;
  stage.update((currentStage) => mergeDeepRight(currentStage, { stage: stageLevel }));
  return true;
};

export const addStageToFarmCompare = (data: stageFarmCompareData) => {
  if (!R.isNumber(data.stage) || !R.isNumber(data.seconds)) return false;

  stage.update((currentStageData) => {
    const temp = R.merge(currentStageData, {
      stageFarmCompare: R.concat(currentStageData.stageFarmCompare ?? [], [data]),
    });
    return temp;
  });
  return true;
};

export const removeStageToFarmCompare = (id: string) => {
  stage.update((currentStageData) => {
    if (!currentStageData?.stageFarmCompare && !R.isArray(currentStageData.stageFarmCompare))
      return currentStageData;

    const withRemovedStage = currentStageData.stageFarmCompare.filter((item) => item.id !== id);

    if (withRemovedStage.length === currentStageData.stageFarmCompare.length)
      return currentStageData;

    return R.merge(currentStageData, {
      stageFarmCompare: withRemovedStage,
    });
  });
};

stage.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem(STAGE_STORE_KEY, JSON.stringify(value));
  }
});
