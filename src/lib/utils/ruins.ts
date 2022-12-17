import { getEnemyIdFromStage } from '$lib/db';
import { ruinConst } from '$lib/db/ruins';

export const getEnemyPattern = (stageLv: number) => {
  const enemies = [];
  const ruinStageLevel = Math.max(1, stageLv + ruinConst.STAGE.start);
  for (const stage of ruinConst.STAGE.lvs) {
    const currentLevel = ruinStageLevel + stage;
    const stageData = getEnemyIdFromStage(currentLevel);
    if (stageData) {
      enemies.push({
        id: enemies.length + 1,
        enemies: stageData.selectedStageSet
      });
    }
  }
  return enemies;
};
