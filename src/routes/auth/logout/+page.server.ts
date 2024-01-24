import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	async default(event) {
		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();
		redirect(303, '/');
	}
};
