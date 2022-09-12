/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
  interface UserSession {
    user: import('@supabase/supabase-js').User;
    accessToken?: string;
  }

  interface Locals extends UserSession {
    error: import('@supabase/supabase-js').ApiError;
  }

  interface Platform {}

  interface Session extends UserSession {}

  interface Stuff {}
}
