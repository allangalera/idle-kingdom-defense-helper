import { MAX_HERO_LEVEL, heroLvCost } from '$lib/db/heroes';
import { z } from 'zod';

const getCurrentLevelUpCostData = (level: number) => {
  let currentLvCost = heroLvCost[0];
  for (const lvCost of heroLvCost) {
    if (lvCost.level <= level) {
      currentLvCost = lvCost;
    } else {
      break;
    }
  }
  return currentLvCost;
};

const heroUpgradeCostCalculatorParameterSchema = z
  .object({
    startLevel: z.number().gte(0),
  })
  .extend({
    endLevel: z.number().lte(MAX_HERO_LEVEL),
  })
  .refine((value) => value.startLevel < value.endLevel, {
    message: 'Start level need to be higher than End level',
  });

export const calculateLevelUpCost = (startLevel: number, endLevel: number) => {
  const validation = heroUpgradeCostCalculatorParameterSchema.safeParse({
    startLevel,
    endLevel,
  });
  const cost = {
    coins: 0,
    souls: 0,
  };

  if (!validation.success) return cost;

  for (let currentLevel = startLevel; currentLevel < endLevel; currentLevel++) {
    const currentHeroLvCost = getCurrentLevelUpCostData(currentLevel);
    cost.coins +=
      currentHeroLvCost.initCostGold +
      currentHeroLvCost.incCostGold * (currentLevel - currentHeroLvCost.level);
    cost.souls +=
      currentHeroLvCost.initCostSoul +
      currentHeroLvCost.incCostSoul * (currentLevel - currentHeroLvCost.level);
  }
  return cost;
};
