import gearMakingJSON from '$lib/gameInfo/gearMaking.json';

const getUltraSummonStageUnlockGrades = () => {
  const unlock = {};
  for (const gear of gearMakingJSON) {
    if (gear.makingGrade !== 4) continue;
    const currentMaxGrade = Math.max(...gear.result.grades);
    if (unlock[gear.step]) continue;
    unlock[gear.step] = {
      grade: currentMaxGrade,
      stage: gear.reqStage,
    };
  }

  return unlock;
};

export const ultraSummonStageUnlockGrades = getUltraSummonStageUnlockGrades();
