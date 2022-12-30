import { raidConst, raidInfoGroupByType } from '$lib/db/raid';
import { shopConst } from '$lib/db/shop';
import langJSON from '$lib/gameInfo/lang.json';
import { returnRewardDataByStage } from './stage';
import { paramCase } from 'change-case';
import { match } from 'oxide.ts';
import * as Belt from '@mobily/ts-belt'

const getRewardByType = (itemType, rewardData, raidInfo) => {
	return match(itemType, [
		[
			102,
			Math.floor(
				(rewardData.idle.goldInit +
					rewardData.idle.goldInc * (raidInfo.difficultyStage - rewardData.idle.lv)) *
				(1 + shopConst.EFFECTOR_DATA_IDLE_GOLD.slice(-1)[0])
			) * raidConst.REWARDINFO.TIC
		],
		[
			27,
			Math.floor(
				(rewardData.idle.soulInit +
					rewardData.idle.soulInc * (raidInfo.difficultyStage - rewardData.idle.lv)) *
				(1 + shopConst.EFFECTOR_DATA_IDLE_SOUL.slice(-1)[0])
			) * raidConst.REWARDINFO.TIC
		],
		[
			24,
			Math.floor(
				rewardData.idle.evolve.init +
				rewardData.idle.evolve.inc * (raidInfo.difficultyStage - rewardData.idle.lv)
			) * raidConst.REWARDINFO.TIC_ITEM
		],
		[
			31,
			Math.floor(
				rewardData.idle.hscroll.init +
				rewardData.idle.hscroll.inc * (raidInfo.difficultyStage - rewardData.idle.lv)
			) * raidConst.REWARDINFO.TIC_ITEM
		],
		[
			32,
			Math.floor(
				rewardData.idle.rscroll.init +
				rewardData.idle.rscroll.inc * (raidInfo.difficultyStage - rewardData.idle.lv)
			) * raidConst.REWARDINFO.TIC_ITEM
		],
		() => 0
	]);
};

export const returnRaidRewards = (raidInfo) => {
	const rewardData = returnRewardDataByStage(raidInfo.difficultyStage);
	const rewards = [];
	for (const reward of raidConst.REWARDINFO.REWARD.ITEM_TYPES) {
		rewards.push({
			t: reward,
			c: getRewardByType(reward, rewardData, raidInfo)
		});
	}
	return rewards;
};

export const returnRaidRewardsByType = () => {
	const raidsData = [];
	for (const raidType of Object.keys(raidInfoGroupByType)) {
		const raidData = {
			name: langJSON[`RAID_BOSS_NAME_${raidType}`],
			levels: []
		};
		for (const level of raidInfoGroupByType[raidType]) {
			const rewardsByStage = returnRaidRewards(level);
			raidData.levels.push({
				...level,
				rewards: [...rewardsByStage, ...level.rewardInfo.rewards]
			});
		}
		raidsData.push(raidData);
	}

	return raidsData;
};

export const returnRaidRewardsMapBySlugfiedType = () => {
	const raidsData = new Map();
	const raidKeys = Belt.D.keys(raidInfoGroupByType)
	for (const raidType of raidKeys) {
		const raidData = {
			name: langJSON[`RAID_BOSS_NAME_${raidType}`],
			levels: []
		};
		for (const level of raidInfoGroupByType[raidType]) {
			const rewardsByStage = returnRaidRewards(level);
			raidData.levels.push({
				...level,
				rewards: [...rewardsByStage, ...level.rewardInfo.rewards]
			});
		}
		raidsData.set(paramCase(raidData.name), raidData);
	}

	return raidsData;
};

export const raidRewards = returnRaidRewardsByType();
export const raidRewardsMapBySlugifiedName = returnRaidRewardsMapBySlugfiedType();
