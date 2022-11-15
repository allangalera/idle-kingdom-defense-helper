import langJSON from '$lib/gameInfo/lang.json';
// import portalConstJSON from '$lib/gameInfo/portalConst.json';
import portalStagesJSON from '$lib/gameInfo/portalStages.json';
import { paramCase } from 'change-case';
import * as R from 'remeda';

export const stages = portalStagesJSON;

export const stagesByLegion = R.groupBy(
	portalStagesJSON,
	(stage) => langJSON[`PORTAL_LEGION_NAME_${stage.legionId}`]
);

export const legionIds = portalStagesJSON.reduce((acc, curr) => {
	acc.add(curr.legionId);
	return acc;
}, new Set<number>());

export const portalLegionsMapByNameSlugified = Array.from(legionIds).reduce((acc, curr) => {
	const legion = {
		id: curr,
		slug: paramCase(langJSON[`PORTAL_LEGION_NAME_${curr}`]),
		name: langJSON[`PORTAL_LEGION_NAME_${curr}`]
	};
	acc.set(legion.slug, legion);
	return acc;
}, new Map());
