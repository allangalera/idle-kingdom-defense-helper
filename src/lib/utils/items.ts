import { match } from 'oxide.ts';

type Item = {
	t: number;
	st?: number;
	gr?: number;
};

export const returnItemStringIdById = (item: Item) => {
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
		[102, 'coin' as const],
		[27, 'soulstone' as const],
		[1, 'steel' as const],
		[24, 'ascension-stone' as const],
		[31, 'hero-seal' as const],
		[32, 'gear-seal' as const],
		[29, 'rune-seal' as const],
		[26, 'ancient-coin' as const],
		[40, 'portal-icon' as const],
		[101, 'ruby' as const],
		[201, 'hero-shard' as const],
		[
			22,
			match(`${item.st}#${item.gr}`, [
				['1#1', 'scroll-armor-normal' as const],
				['1#2', 'scroll-armor-shiny' as const],
				['2#1', 'scroll-weapon-normal' as const],
				['2#2', 'scroll-weapon-shiny' as const],
				() => null
			])
		],
		[
			23,
			match(`${item.st}#${item.gr}`, [
				['1#1', 'protect-armor-normal' as const],
				['1#2', 'protect-armor-shiny' as const],
				['2#1', 'protect-weapon-normal' as const],
				['2#2', 'protect-weapon-shiny' as const],
				() => null
			])
		],
		() => null
	]);
};
