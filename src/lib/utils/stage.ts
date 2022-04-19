import { ArcherGearEquip, HeroGearEquip } from '$lib/enums';
import { equals } from 'ramda';
import { getEnemyIdFromStage } from '$lib/db';
import {
  stageIdleReward,
  stageClearReward,
  designStageUnlock,
  heroGearStageUnlock,
} from '$lib/db/stage';

export const calculateHeroDropFromStage = (stage) => {
  const stageDrops = [
    'all',
    HeroGearEquip.weapon,
    HeroGearEquip.helmet,
    HeroGearEquip.chest,
    HeroGearEquip.boots,
  ];

  return stageDrops[stage % 5];
};

export const calculateArcherDropFromStage = (stage) => {
  const drops = [
    'all',
    ArcherGearEquip.bow,
    ArcherGearEquip.arrow,
    ArcherGearEquip.helmet,
    ArcherGearEquip.chest,
    ArcherGearEquip.gloves,
    ArcherGearEquip.boots,
  ];

  return drops[stage % 7];
};

export const validateIfGearIsValid = (currentBestGear, stageGear, wanted) => {
  const hasHeroGear = wanted.hero.length > 0;
  const hasArcherGear = wanted.archer.length > 0;

  if (!currentBestGear.hero && !currentBestGear.archer) return false;

  if (hasHeroGear && hasArcherGear) {
    return equals(currentBestGear, stageGear);
  } else if (hasHeroGear && !hasArcherGear) {
    return equals(currentBestGear.hero, stageGear.hero);
  } else if (!hasHeroGear && hasArcherGear) {
    return equals(currentBestGear.archer, stageGear.archer);
  }

  return equals(currentBestGear, stageGear);
};

export const returnItemLevelDropFromStage = (stage) => {
  let archer = 0;
  let hero = 0;
  for (const grade of Object.keys(designStageUnlock)) {
    if (designStageUnlock[grade] > stage) break;
    archer = +grade;
  }
  for (const grade of Object.keys(heroGearStageUnlock)) {
    if (heroGearStageUnlock[grade] > stage) break;
    hero = +grade;
  }

  return { archer, hero };
};

export const calculateStage = (stage: string, wantedGear, enemies) => {
  const parsedStage = +stage || 1;
  const items_per_page = 20;

  const stages = [];
  let stageGear;
  let latestStageSearched = parsedStage;

  for (let currentStage = parsedStage - 1; currentStage > 0; currentStage--) {
    stageGear = returnItemLevelDropFromStage(currentStage);

    const heroDropFromStage = stageGear.hero && calculateHeroDropFromStage(currentStage);
    const archerDropFromStage = stageGear.archer && calculateArcherDropFromStage(currentStage);
    const { stageData, selectedStageSet: enemyType } = getEnemyIdFromStage(currentStage);
    const hasEnemy =
      enemies.length === 0
        ? true
        : enemies.every((enemy) =>
            enemyType.some((enemyTypeItem) => enemy === enemyTypeItem.unitId)
          );

    if (!hasEnemy) continue;

    const currentStageData = {
      stage: currentStage,
      data: stageData,
      enemy: enemyType,
      drop: {
        hero: heroDropFromStage,
        archer: archerDropFromStage,
      },
      bestGear: stageGear,
    };

    const condition = `${Math.min(wantedGear.hero.length, 2)}-${Math.min(
      wantedGear.archer.length,
      2
    )}`;

    switch (condition) {
      case '0-0':
        if ((heroDropFromStage === 'all' && archerDropFromStage === 'all') || hasEnemy) {
          stages.push(currentStageData);
        }
        break;
      case '0-1':
        if (wantedGear.archer.includes(archerDropFromStage)) {
          stages.push(currentStageData);
        }
        break;
      case '0-2':
        if (archerDropFromStage === 'all') {
          stages.push(currentStageData);
        }
        break;
      case '1-0':
        if (wantedGear.hero.includes(heroDropFromStage)) {
          stages.push(currentStageData);
        }
        break;
      case '1-1':
        if (
          wantedGear.hero.includes(heroDropFromStage) &&
          wantedGear.archer.includes(archerDropFromStage)
        ) {
          stages.push(currentStageData);
        }
        break;
      case '1-2':
        if (wantedGear.hero.includes(heroDropFromStage) && archerDropFromStage === 'all') {
          stages.push(currentStageData);
        }
        break;
      case '2-0':
        if (heroDropFromStage === 'all') {
          stages.push(currentStageData);
        }
        break;
      case '2-1':
        if (heroDropFromStage === 'all' && wantedGear.archer.includes(archerDropFromStage)) {
          stages.push(currentStageData);
        }
        break;
      case '2-2':
        if (heroDropFromStage === 'all' && archerDropFromStage === 'all') {
          stages.push(currentStageData);
        }
        break;
    }
    latestStageSearched = currentStage;
    if (stages.length === items_per_page) break;
  }

  return {
    stages,
    latestStageSearched,
  };
};

export const returnRewardDataByStage = (stage: number) => {
  let idleReward;
  for (const reward of stageIdleReward) {
    if (reward.lv <= stage) {
      idleReward = reward;
    } else {
      break;
    }
  }
  let clearReward;
  for (const reward of stageClearReward) {
    if (reward.lv <= stage) {
      clearReward = reward;
    } else {
      break;
    }
  }

  return {
    idle: idleReward,
    clear: clearReward,
  };
};
