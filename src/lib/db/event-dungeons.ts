// import eventDunConstJSON from '$lib/gameInfo/eventDunConst.json';
import eventDunDataJSON from '$lib/gameInfo/eventDunData.json';
import langJSON from '$lib/gameInfo/lang.json';
import * as R from 'remeda';

export const eventDungeons = R.groupBy(
  eventDunDataJSON,
  (x) => langJSON[`EVENTDUNGEON_NAME_${x.dType}`]
);
