import conquestKingdomsJSON from '$lib/gameInfo/conquestKingdoms.json';
import langJSON from '$lib/gameInfo/lang.json';

const getContinentId = (kingdomId: number) => {
	return Math.floor((kingdomId - 1) / 12 + 1);
};

const getContinentName = (kingdomId: number) => {
	const continents = {
		1: 'Green',
		2: 'Glacial',
		3: 'Rock',
	};

	return continents[getContinentId(kingdomId)] ?? 'Green';
};

const generateKingdoms = () => {
	return conquestKingdomsJSON.map((kingdom) => {
		return {
			...kingdom,
			continent: getContinentName(kingdom.id),
			continentId: getContinentId(kingdom.id),
			name: langJSON[kingdom.name],
		};
	});
};

export const kingdoms = generateKingdoms();
