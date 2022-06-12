import { runes } from '$lib/db/runes';
import { Attributes } from '$lib/enums';
import { match } from 'oxide.ts';

type GetRunById = (id: number) => typeof runes[number];

export const getRuneById: GetRunById = (id) => {
  for (const rune of runes) {
    if (rune.id === id) {
      return rune;
    }
  }
};

export const returnRuneAttribute = (attr: number) => {
  return match(attr, [
    [8, Attributes.criDamage],
    [2, Attributes.atk],
  ]);
};
