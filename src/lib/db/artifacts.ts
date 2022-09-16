import artifactConstJSON from '$lib/gameInfo/artifactConst.json';
import artifactDataJSON from '$lib/gameInfo/artifactData.json';
import artifactGradeJSON from '$lib/gameInfo/artifactGrade.json';
import langJSON from '$lib/gameInfo/lang.json';
import * as R from 'remeda';

export const artifactConst = artifactConstJSON;
export const artifactData = artifactDataJSON;
export const artifactGrade = artifactGradeJSON;

export const sortById = R.sortBy<{
  id: number;
  name: string;
}>([(x) => x.id, 'asc']);

export const artifacts = sortById(
  Object.values(artifactConst.TYPE).map((artifact) => {
    return {
      id: artifact,
      name: langJSON[`ARTIFACT_TYPE_${artifact}`],
    };
  })
);

export const abilitiesIdsAllowed = artifactConst.AWAKEN.RATES.map((item) => item.t);
