import { artifactConst, artifactData } from '$lib/db/artifacts';
import { returnAbilityName } from '$lib/utils/abilities';
import type { Abilities } from '$lib/utils/abilities';

type calculateArtifactStatsParams = {
  type: number;
  grade: number;
  level: number;
  abilities: Record<
    1 | 2 | 3 | 4,
    {
      type: Abilities;
      level: number;
    }
  >;
};

export const calculateArtifactStats = ({
  type,
  grade,
  level,
  abilities,
}: calculateArtifactStatsParams) => {
  const thisArtifactData = artifactData.find((item) => item.type === type && item.grade === grade);
  if (!thisArtifactData) return;

  return {
    name: returnAbilityName(artifactConst.ABILITY[type - 1] as Abilities),
    value: thisArtifactData.abilityBase + level * thisArtifactData.abilityInc,
    abilities: {
      1: {
        name: returnAbilityName(abilities[1].type),
        value: abilities[1].level
          ? thisArtifactData[`awakenBase_${abilities[1].type}`] +
            (abilities[1].level - 1) * thisArtifactData[`awakenInc_${abilities[1].type}`]
          : 0,
      },
      2: {
        name: returnAbilityName(abilities[2].type),
        value: abilities[2].level
          ? thisArtifactData[`awakenBase_${abilities[2].type}`] +
            (abilities[2].level - 1) * thisArtifactData[`awakenInc_${abilities[2].type}`]
          : 0,
      },
      3: {
        name: returnAbilityName(abilities[3].type),
        value: abilities[3].level
          ? thisArtifactData[`awakenBase_${abilities[3].type}`] +
            (abilities[3].level - 1) * thisArtifactData[`awakenInc_${abilities[3].type}`]
          : 0,
      },
      4: {
        name: returnAbilityName(abilities[4].type),
        value: abilities[4].level
          ? thisArtifactData[`awakenBase_${abilities[4].type}`] +
            (abilities[4].level - 1) * thisArtifactData[`awakenInc_${abilities[4].type}`]
          : 0,
      },
    },
  };
};
