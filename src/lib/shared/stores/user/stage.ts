import { browser } from '$app/environment';
import { MAX_STAGE_LEVEL } from '$lib/constants';
import * as R from 'remeda';
import { writable } from 'svelte/store';
import { z } from 'zod';

type stageFarmCompareData = {
	id: string;
	stage: number;
	seconds: number;
};
type StageStore = {
	stage: number;
	stageFarmCompare: stageFarmCompareData[];
};

const STAGE_STORE_KEY = 'STAGE_STORE_KEY';

const initialStage = browser ? JSON.parse(window.localStorage.getItem(STAGE_STORE_KEY)) ?? {} : {};

export const stage = writable<StageStore>(initialStage);

export const updateStage = (stageLevel: number) => {
	const { success } = z.number().gt(0).lte(MAX_STAGE_LEVEL).safeParse(stageLevel);

	if (!success) return false;

	stage.update((currentStage) => R.merge(currentStage, { stage: stageLevel }));
	return true;
};

export const addStageToFarmCompare = (data: stageFarmCompareData) => {
	const schema = z.object({
		stage: z.number().gt(0).lte(MAX_STAGE_LEVEL),
		seconds: z.number().gt(0)
	});

	const { success } = schema.safeParse(data);

	if (!success) return false;

	stage.update((currentStageData) => {
		const temp = R.merge(currentStageData, {
			stageFarmCompare: R.concat(currentStageData.stageFarmCompare ?? [], [data])
		});
		return temp;
	});
	return true;
};

export const removeStageToFarmCompare = (id: string) => {
	stage.update((currentStageData) => {
		if (!currentStageData?.stageFarmCompare && !R.isArray(currentStageData.stageFarmCompare))
			return currentStageData;

		const withRemovedStage = currentStageData.stageFarmCompare.filter((item) => item.id !== id);

		if (withRemovedStage.length === currentStageData.stageFarmCompare.length)
			return currentStageData;

		return R.merge(currentStageData, {
			stageFarmCompare: withRemovedStage
		});
	});
};

stage.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(STAGE_STORE_KEY, JSON.stringify(value));
	}
});
