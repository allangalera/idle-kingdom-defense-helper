import { writable } from 'svelte/store';

export const bestGear = writable({
	['hero.full']: 'hero-common-1',
	['hero.rarity']: 'common',
	['hero.level']: '1',
	['archer.full']: 'archer-common-1',
	['archer.rarity']: 'common',
	['archer.level']: '1',
});
