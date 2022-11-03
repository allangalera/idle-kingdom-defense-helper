import { createClient } from '@supabase/auth-helpers-sveltekit';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabaseClient = createClient(url, key);
