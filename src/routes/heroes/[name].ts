import { heroes } from '$lib/db/heroes';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
  const hero = await heroes.find((hero) => hero.name.toLowerCase() === params.name);

  if (hero) {
    return {
      body: { hero },
    };
  }

  return {
    status: 404,
  };
}
