import { MAX_STAGE_LEVEL } from '$lib/constants';
import runeJSON from '$lib/gameInfo/rune.json';
import runeConstJSON from '$lib/gameInfo/runeConst.json';
import runeSummonJSON from '$lib/gameInfo/runeSummon.json';

const getRunesSummonStageUnlock = () => {
  const rewards = {};
  for (const summon of runeSummonJSON) {
    if (summon.stage > MAX_STAGE_LEVEL) continue;
    const currentMaxGrade = Math.max(...summon.result.grades);
    rewards[summon.id] = {
      grade: currentMaxGrade,
      stage: summon.stage,
      exp: summon.exp,
    };
  }

  return rewards;
};

export const runesSummonStageUnlock = getRunesSummonStageUnlock();

export const runes = runeJSON;

export const runesMap: Map<number, typeof runeJSON[number]> = runeJSON.reduce(
  (previousValue, currentValue) => {
    return previousValue.set(currentValue.id, currentValue);
  },
  new Map()
);

export const MAX_RUNE_ENCHANT_LEVEL = runeConstJSON.ENCHANT.MAX;
