import { writable } from 'svelte/store';
import {
	mergeDeepRight,
	is,
	hasPath,
	or,
	isNil,
	find,
	propEq,
	pathOr,
	append,
	filter,
	clone,
} from 'ramda';
import { browser } from '$app/env';

type Hero = {
	id: number;
	level: number;
	grade: number;
};

type HeroesStore = {
	heroes: Hero[];
};

const HEROES_STORE_KEY = 'HEROES_STORE_KEY';

const initialState = browser ? JSON.parse(window.localStorage.getItem(HEROES_STORE_KEY)) ?? {} : {};

export const heroes = writable<HeroesStore>(initialState);

export const addHero = (hero: Hero) => {
	const { id, level, grade } = hero;
	if (or(isNil(id), isNil(level), isNil(grade))) return;
	heroes.update((currentData) => {
		if (hasPath(['heroes'], currentData) && find(propEq('id', id))(currentData.heroes)) {
			return currentData;
		}
		return mergeDeepRight(currentData, {
			heroes: append(hero, pathOr([], ['heroes'], currentData)),
		});
	});
	return true;
};

export const addOrUpdateHero = (hero: Hero) => {
	const { id, level, grade } = hero;
	if (or(isNil(id), isNil(level), isNil(grade))) return;
	heroes.update((currentData) => {
		const clonedHeroes = clone(pathOr([], ['heroes'], currentData));
		const findIndex = clonedHeroes.findIndex((el) => el.id === hero.id);

		if (findIndex !== -1) clonedHeroes[findIndex] = hero;
		else clonedHeroes.push(hero);

		return mergeDeepRight(currentData, {
			heroes: clonedHeroes,
		});
	});
	return true;
};

export const removeHero = (id: number) => {
	if (!is(Number, id)) return false;
	heroes.update((currentData) => {
		if (hasPath(['heroes'], currentData) && !find(propEq('id', id))(currentData.heroes)) {
			return currentData;
		}

		return mergeDeepRight(currentData, {
			heroes: filter((item) => item.id !== id, currentData.heroes),
		});
	});
	return true;
};

heroes.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(HEROES_STORE_KEY, JSON.stringify(value));
	}
});
