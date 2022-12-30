import langJSON from '$lib/gameInfo/lang.json';
import { D, A } from '@mobily/ts-belt';

export const lang = langJSON;

export type LangKeys = keyof typeof langJSON;

const langKeyNames = D.keys(lang);

const isStringATranslation = (key: string): key is LangKeys => {
	return A.includes(langKeyNames, key);
};

export const getTranslation = (key: string) => {
	if (isStringATranslation(key)) {
		return lang[key];
	}

	console.warn('[lang] Translation key not found');

	return key;
};
