import langJSON from '$lib/gameInfo/lang.json';
import portalConstJSON from '$lib/gameInfo/portalConst.json';
import portalStagesJSON from '$lib/gameInfo/portalStages.json';
import * as R from 'remeda';

export const stages = portalStagesJSON;

export const stagesByLegion = R.groupBy(
  portalStagesJSON,
  (stage) => langJSON[`PORTAL_LEGION_NAME_${stage.legionId}`]
);
