import { browser } from '$app/environment';
import * as R from 'remeda';
import { writable } from 'svelte/store';

const PROFILES_STORE_KEY = 'PROFILES_STORE_KEY';

const initialStage = browser
	? JSON.parse(window.localStorage.getItem(PROFILES_STORE_KEY)) ?? {}
	: {};

export const profilesStore = writable(initialStage);

export const updateSelectedProfile = (selectedProfile) => {
	profilesStore.update((currentData) => {
		return R.merge(currentData, {
			selectedProfile
		});
	});
};

profilesStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(PROFILES_STORE_KEY, JSON.stringify(value));
	}
});
