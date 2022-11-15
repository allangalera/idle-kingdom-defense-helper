import { portalLegionsMapByNameSlugified } from '$lib/db/portal';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	console.log({ params });
	if (portalLegionsMapByNameSlugified.has(params.name)) {
		return {
			portal: portalLegionsMapByNameSlugified.get(params.name)
		};
	}

	throw error(404, 'Not found');
};
