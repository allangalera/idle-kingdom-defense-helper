import { MAX_HERO_LEVEL } from '$lib/db/heroes';
import { RarityEnum } from '$lib/enums';
import type { UpgradeLevel } from '$lib/types';
import { match } from 'oxide.ts';
import { z } from 'zod';

const DIGITS_STR = [
  'K',
  'M',
  'B',
  'T',
  'aa',
  'ab',
  'ac',
  'ad',
  'ae',
  'af',
  'ag',
  'ah',
  'ai',
  'aj',
  'ak',
  'al',
  'am',
  'an',
  'ao',
  'ap',
  'aq',
  'ar',
  'as',
  'at',
  'au',
  'av',
  'aw',
  'ax',
  'ay',
  'az',
  'ba',
  'bb',
  'bc',
  'bd',
  'be',
  'bf',
  'bg',
  'bh',
  'bi',
  'bj',
  'bk',
  'bl',
  'bm',
  'bn',
  'bo',
  'bp',
  'bq',
  'br',
  'bs',
  'bt',
  'bu',
  'bv',
  'bw',
  'bx',
  'by',
  'bz',
  'ca',
  'cb',
  'cc',
  'cd',
  'ce',
  'cf',
  'cg',
  'ch',
  'ci',
  'cj',
  'ck',
  'cl',
  'cm',
  'cn',
  'co',
  'cp',
  'cq',
  'cr',
  'cs',
  'ct',
  'cu',
  'cv',
  'cw',
  'cx',
  'cy',
  'cz',
  'da',
  'db',
  'dc',
  'dd',
  'de',
  'df',
  'dg',
  'dh',
  'di',
  'dj',
  'dk',
  'dl',
  'dm',
  'dn',
  'do',
  'dp',
  'dq',
  'dr',
  'ds',
  'dt',
  'du',
  'dv',
  'dw',
  'dx',
  'dy',
  'dz',
  'ea',
  'eb',
  'ec',
  'ed',
  'ee',
  'ef',
  'eg',
  'eh',
  'ei',
  'ej',
  'ek',
  'el',
  'em',
  'en',
  'eo',
  'ep',
  'eq',
  'er',
  'es',
  'et',
  'eu',
  'ev',
  'ew',
  'ex',
  'ey',
  'ez',
  'fa',
  'fb',
  'fc',
  'fd',
  'fe',
  'ff',
  'fg',
  'fh',
  'fi',
  'fj',
  'fk',
  'fl',
  'fm',
  'fn',
  'fo',
  'fp',
  'fq',
  'fr',
  'fs',
  'ft',
  'fu',
  'fv',
  'fw',
  'fx',
  'fy',
  'fz',
];
const DIGITS_NUMBER = 1000;
const DIGITS_COUNT = Math.floor(Math.log10(DIGITS_NUMBER));

export const genericRounding: (value: number, fixed?: number) => string = (value, fixed = 0) => {
  if (!value) return '0';
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  return value.toString().match(re)[0];
};

type GetIdleKingdomNumberFormat = (value: number, decimalNumbers?: number) => string;

export const getIdleKingdomNumberFormat: GetIdleKingdomNumberFormat = (
  value,
  decimalNumbers = 0
): string => {
  const formattedString = genericRounding(value, decimalNumbers);

  if (value < 100000) {
    return formattedString;
  }

  const unit = Math.floor((Math.log10(value) - 4) / DIGITS_COUNT) + 1;
  const newValue = genericRounding(value / Math.pow(1000, unit), decimalNumbers).toString();

  return `${newValue}${DIGITS_STR[unit - 1]}`;
};

export const heroUpgradeCostCalculatorParameterSchema = z
  .object({
    currentLevel: z.number().gte(1),
  })
  .extend({
    targetLevel: z.number().lte(MAX_HERO_LEVEL),
  })
  .refine((value) => value.currentLevel < value.targetLevel, {
    message: 'Current level need to be higher than Target level',
  });

export const romanize = (num: number) => {
  if (isNaN(num)) return NaN;
  const digits = String(+num).split('');
  const key = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM',
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC',
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
  ];
  let roman = '';
  let i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
  return Array(+digits.join('') + 1).join('M') + roman;
};

export const convertGradeToStarLevel = (
  grade: number
): { rarity: RarityEnum; level: UpgradeLevel } => {
  const level = match(grade % 5, [[0, 5], (n) => n]) as UpgradeLevel;

  const rarity = match(grade / 5, [
    [(n) => n <= 1, RarityEnum.common],
    [(n) => n <= 2, RarityEnum.uncommon],
    [(n) => n <= 3, RarityEnum.rare],
    [(n) => n <= 4, RarityEnum.epic],
    [(n) => n <= 5, RarityEnum.legendary],
    () => RarityEnum.mythic,
  ]);

  return { rarity, level };
};
