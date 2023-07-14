import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	async default(event) {
		const { request, url } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { error } = await supabaseClient.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: url.origin
			}
		});

		if (error) {
			return fail(400, {
				message: error.message,
				values: { email }
			});
		}

		return {
			success: true,
			message: 'Please check your email for a magic link to log into the website.'
		};
	}
};
