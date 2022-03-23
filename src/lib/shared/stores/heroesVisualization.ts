import { HeroesVisualizationModes } from '$lib/enums';
import { writable } from 'svelte/store';

export const heroesVisualization = writable<HeroesVisualizationModes>(
	HeroesVisualizationModes.compact
);
