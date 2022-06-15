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
    [6, Attributes.cri],
    [10, Attributes.dodge],
    [1, Attributes.atkSpeed],
    [11, Attributes.hp],
    [4, Attributes.defPierce],
    [3, Attributes.def],
    [7, Attributes.criResist],
    [9, Attributes.hit],
    [5, Attributes.moveSpeed],
    [13, Attributes.defPierceResist],
    [12, Attributes.criDamageResist],
  ]);
};
