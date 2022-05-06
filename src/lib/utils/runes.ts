import { runes } from '$lib/db/runes';

type GetRunById = (id: number) => typeof runes[number];

export const getRuneById: GetRunById = (id) => {
  for (const rune of runes) {
    if (rune.id === id) {
      return rune;
    }
  }
};
