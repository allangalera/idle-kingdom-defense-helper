import { heroes } from '$lib/db/heroes';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const hero = await heroes.find((hero) => hero.name.toLowerCase() === params.name);

	if (hero) {
		return {
			hero
		};
	}

	error(404, 'Not found');
};
