import { browser } from '$app/environment';
import { MAX_HERO_GRADE, MAX_HERO_LEVEL } from '$lib/db/heroes';
import type { UserRuneType } from '$lib/db/heroes';
import type { UserHero } from '$lib/db/heroes';
import type { HeroGearEquipTypes } from '$lib/types/enums';
import * as R from 'remeda';
import { writable } from 'svelte/store';
import { z } from 'zod';

type HeroesStore = {
	heroes: UserHero[];
};

const HEROES_STORE_KEY = 'HEROES_STORE_KEY';

const initialState = browser ? JSON.parse(window.localStorage.getItem(HEROES_STORE_KEY)) ?? {} : {};

export const heroes = writable<HeroesStore>(initialState);

export const addHero = (hero: UserHero) => {
	const schema = z.object({
		id: z.number(),
		level: z.number().gt(0).lte(MAX_HERO_LEVEL),
		grade: z.number().gt(0).lte(MAX_HERO_GRADE),
	});

	const { success } = schema.safeParse(hero);

	if (!success) return false;

	heroes.update((currentData) => {
		if (currentData?.heroes && currentData.heroes.find((cHero) => cHero.id === hero.id)) {
			return currentData;
		}
		return R.merge(currentData, {
			heroes: [hero, ...(currentData.heroes ?? [])],
		});
	});
	return true;
};

export const addOrUpdateHero = (hero: UserHero) => {
	const schema = z.object({
		id: z.number().gt(0),
		level: z.number().gt(0).lte(MAX_HERO_LEVEL),
		grade: z.number().gt(0).lte(MAX_HERO_GRADE),
	});

	const { success } = schema.safeParse(hero);

	if (!success) return false;

	heroes.update((currentData) => {
		const clonedHeroes = R.clone(currentData?.heroes ?? []);
		const findIndex = clonedHeroes.findIndex((el) => el.id === hero.id);

		if (findIndex !== -1) clonedHeroes[findIndex] = { ...clonedHeroes[findIndex], ...hero };
		else clonedHeroes.push(hero);

		return R.merge(currentData, {
			heroes: clonedHeroes,
		});
	});
	return true;
};

export const removeHero = (id: number) => {
	const { success } = z.number().gt(0).safeParse(id);

	if (!success) return false;
	if (!R.isNumber(id)) return false;
	heroes.update((currentData) => {
		if (currentData?.heroes && !currentData.heroes.find((cHero) => cHero.id === id)) {
			return currentData;
		}

		return R.merge(currentData, {
			heroes: currentData.heroes.filter((item) => item.id !== id),
		});
	});
	return true;
};

export const addOrUpdateHeroArtifact = (heroId: number, slot: 'left' | 'right', artifact: any) => {
	heroes.update((currentData) => {
		const newHeroes = currentData.heroes.map((hero) => {
			if (heroId === hero.id) {
				if (!hero.artifacts) hero.artifacts = {};
				hero.artifacts[slot] = artifact;
			}
			return hero;
		});
		return R.merge(currentData, {
			heroes: newHeroes,
		});
	});
};

export const removeHeroArtifact = (heroId: number, slot: 'left' | 'right') => {
	heroes.update((currentData) => {
		const newHeroes = currentData.heroes.map((hero) => {
			if (heroId === hero.id) {
				if (!hero.artifacts) hero.artifacts = {};
				hero.artifacts[slot] = null;
			}
			return hero;
		});
		return R.merge(currentData, {
			heroes: newHeroes,
		});
	});
};
export const addOrUpdateHeroGear = (
	heroId: number,
	gearType: HeroGearEquipTypes,
	grade: number,
) => {
	heroes.update((currentData) => {
		const newHeroes = currentData.heroes.map((hero) => {
			if (heroId === hero.id) {
				if (!hero.equip) hero.equip = {};
				hero.equip[gearType] = grade;
			}
			return hero;
		});
		return R.merge(currentData, {
			heroes: newHeroes,
		});
	});
};

export const removeHeroGear = (heroId: number, gearType: HeroGearEquipTypes) => {
	heroes.update((currentData) => {
		const newHeroes = currentData.heroes.map((hero) => {
			if (heroId === hero.id) {
				if (!hero.equip) hero.equip = {};
				hero.equip[gearType] = null;
			}
			return hero;
		});
		return R.merge(currentData, {
			heroes: newHeroes,
		});
	});
};

export const addOrUpdateHeroRune = (heroId: number, runeData: UserRuneType) => {
	heroes.update((currentData) => {
		const newHeroes = currentData.heroes.map((hero) => {
			if (heroId === hero.id) {
				if (!hero.runes) hero.runes = {};
				hero.runes[runeData.id] = runeData;
			}
			return hero;
		});
		return R.merge(currentData, {
			heroes: newHeroes,
		});
	});
};

export const removeHeroRune = (heroId: number, runeId: number) => {
	heroes.update((currentData) => {
		const newHeroes = currentData.heroes.map((hero) => {
			if (heroId === hero.id) {
				if (!hero.runes) hero.runes = {};
				if (hero.runes[runeId]) {
					delete hero.runes[runeId];
				}
			}
			return hero;
		});
		return R.merge(currentData, {
			heroes: newHeroes,
		});
	});
};

heroes.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(HEROES_STORE_KEY, JSON.stringify(value));
	}
});
