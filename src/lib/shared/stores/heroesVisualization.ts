import { HeroesVisualizationModes } from '$lib/types/enums';
import { writable } from 'svelte/store';

export const heroesVisualization = writable<HeroesVisualizationModes>(
	HeroesVisualizationModes.compact,
);
