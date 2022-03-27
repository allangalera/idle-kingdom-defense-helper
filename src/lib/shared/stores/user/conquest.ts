import { writable } from 'svelte/store';
import { mergeDeepRight, is, append, hasPath, pathOr, filter } from 'ramda';
import { browser } from '$app/env';

type ConquestStore = {
	kingdoms: number[];
};

const CONQUEST_STORE_KEY = 'CONQUEST_STORE_KEY';

const initialState = browser
	? JSON.parse(window.localStorage.getItem(CONQUEST_STORE_KEY)) ?? {}
	: {};

export const conquest = writable<ConquestStore>(initialState);

export const addKingdom = (kingdomId: number) => {
	if (!is(Number, kingdomId)) return false;
	conquest.update((currentData) => {
		if (hasPath(['kingdoms'], currentData) && currentData.kingdoms.includes(kingdomId))
			return currentData;
		return mergeDeepRight(currentData, {
			kingdoms: append(kingdomId, pathOr([], ['kingdoms'], currentData)),
		});
	});
	return true;
};

export const removeKingdom = (kingdomId: number) => {
	if (!is(Number, kingdomId)) return false;
	conquest.update((currentData) => {
		if (!hasPath(['kingdoms'], currentData)) return currentData;
		if (!currentData.kingdoms.includes(kingdomId)) return currentData;

		return mergeDeepRight(currentData, {
			kingdoms: filter((item) => item !== kingdomId, currentData.kingdoms),
		});
	});
	return true;
};

conquest.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(CONQUEST_STORE_KEY, JSON.stringify(value));
	}
});
