import runeSummonJSON from '$lib/gameInfo/runeSummon.json';

const getRunesSummonStageUnlock = () => {
  const rewards = {};
  for (const summon of runeSummonJSON) {
    if (summon.stage > 50000) continue;
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
