import { browser } from '$app/environment';
import { calculatorsInformationStore } from './calculatorsInformation';
import { conquest } from './conquest';
import { heroes } from './heroes';
import { stage } from './stage';
import { derived } from 'svelte/store';
import * as zipson from 'zipson';

const stores = [stage, conquest, heroes, calculatorsInformationStore];

export const user = derived(stores, (values) => {
	if (!browser) return 'no token';

	return zipson.stringify(values);
});

export const loadFromZipson = (token: string) => {
	const loaded = zipson.parse(token);

	stores.forEach((store, index) => {
		store.set(loaded[index]);
	});
};

export const clearUserLocalData = () => {
	stores.forEach((store) => {
		store.set({});
	});
};
