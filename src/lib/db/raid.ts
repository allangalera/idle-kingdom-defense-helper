import raidConstJSON from '$lib/gameInfo/raidConst.json';
import raidInfoJSON from '$lib/gameInfo/raidInfo.json';
import * as R from 'remeda';

export const raidInfo = raidInfoJSON;

export const raidInfoGroupByType = R.groupBy(raidInfoJSON, (x) => x.bossId);

export const raidConst = raidConstJSON;
