import { browser } from '$app/environment';
import * as R from 'remeda';
import { writable } from 'svelte/store';

const CALCULATORS_INFORMATION_STORE_KEY = 'CALCULATORS_INFORMATION_STORE_KEY';

const initialStage = browser
	? JSON.parse(window.localStorage.getItem(CALCULATORS_INFORMATION_STORE_KEY)) ?? {}
	: {};

export const calculatorsInformationStore = writable(initialStage);

export const updateCalculatorInformation = (key: string, info) => {
	calculatorsInformationStore.update((currentData) => {
		return R.merge(currentData, {
			[key]: info
		});
	});
};

calculatorsInformationStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(CALCULATORS_INFORMATION_STORE_KEY, JSON.stringify(value));
	}
});
