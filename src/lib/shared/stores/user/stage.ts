import { writable } from 'svelte/store';
import { mergeDeepRight, is } from 'ramda';
import { browser } from '$app/env';

type StageStore = {
	stage: number;
};

const STAGE_STORE_KEY = 'STAGE_STORE_KEY';

const initialStage = browser ? JSON.parse(window.localStorage.getItem(STAGE_STORE_KEY)) ?? {} : {};

export const stage = writable<StageStore>(initialStage);

export const updateStage = (stageLevel: number) => {
	if (!is(Number, stageLevel)) return false;
	stage.update((currentStage) => mergeDeepRight(currentStage, { stage: stageLevel }));
	return true;
};

stage.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(STAGE_STORE_KEY, JSON.stringify(value));
	}
});
