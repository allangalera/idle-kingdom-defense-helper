import { match } from 'oxide.ts';

type Item = {
  t: number;
  st: number;
};

export const returnItemStringIdById = (item) => {
  // RAIDCOIN = 60,
  // EXP = 100,
  // RUNE = 8,
  // PTICKET = 41,
  // EVOLVE = 24,
  // SHOES = 6,
  // HCOIN = 26,
  // HELMET = 3,
  // RUINTICKET = 51,
  // SUMMONTICKET = 70,
  // INAPP_PACKAGE = 999,
  // PCOIN = 40,
  // RUINCOIN = 50,
  // EFFECTOR = 301,
  // REMODEL_PACK = 305,
  // SOUL = 27,
  // PASS_PREMIUM = 303,
  // ENCHANT = 22,
  // DESIGN = 21,
  // SANCTUARY_SCROLL = 29,
  // ADFREE = 302,
  // HEROPIECE = 201,
  // IRON = 103,
  // MDUST = 28,
  // BOW = 1,
  // RSCROLL = 32,
  // CASH = 101,
  // HGEAR = 7,
  // RAIDTICKET = 61,
  // PASSHERO_PREMIUM = 304,
  // PROTECT = 23,
  // GLOVES = 5,
  // ARROW = 2,
  // HSCROLL = 31,
  // ARMOR = 4,
  // GOLD = 102
  return match(item.t, [
    [102, 'coin'],
    [27, 'soulstone'],
    [1, 'steel'],
    [24, 'ascension-stone'],
    [31, 'hero-seal'],
    [32, 'gear-seal'],
    [29, 'rune-seal'],
    [26, 'ancient-coin'],
    [40, 'portal-icon'],
    [101, 'ruby'],
    [22, match(item.st, [[1, 'scroll-weapon-normal'], [2, 'scroll-weapon-normal'], () => null])],
    () => null,
  ]);
};
