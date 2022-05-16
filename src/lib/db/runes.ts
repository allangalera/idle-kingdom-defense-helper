import { MAX_STAGE_LEVEL } from '$lib/constants';
import runeJSON from '$lib/gameInfo/rune.json';
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
