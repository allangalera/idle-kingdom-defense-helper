import { raidRewardsMapBySlugifiedName } from '$lib/utils/raid';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	if (raidRewardsMapBySlugifiedName.has(params.name)) {
		return {
			raid: raidRewardsMapBySlugifiedName.get(params.name)
		};
	}

	throw error(404, 'Not found');
};
