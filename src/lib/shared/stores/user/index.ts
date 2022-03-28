import { derived } from 'svelte/store';
import { browser } from '$app/env';
import { stage } from './stage';
import { conquest } from './conquest';
import { heroes } from './heroes';

const stores = [stage, conquest, heroes];

export const user = derived(stores, (values) => {
	if (!browser) return 'no token';
	const token = window.btoa(JSON.stringify(values));
	return token;
});

export const loadFromBase64 = (token: string) => {
	const loaded = JSON.parse(window.atob(token));
	stores.forEach((store, index) => {
		store.set(loaded[index]);
	});
};
