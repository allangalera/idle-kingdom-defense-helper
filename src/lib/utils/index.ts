import { nanoid } from 'nanoid';

export const addIdToCollection = <T>(collection: T[]): (T & { id: string })[] => {
	return collection.map((item) => {
		return {
			...item,
			id: nanoid(),
		};
	});
};

export const createSortByListAndName = (tierList) => (array) => {
	const clonedArray = array.slice();
	const sortFunction = (prev, curr) => {
		const prevTier = tierList.indexOf(prev.tier.name);
		const currTier = tierList.indexOf(curr.tier.name);
		if (prevTier > currTier) return 1;
		if (prevTier < currTier) return -1;
		if (prev.name > curr.name) return 1;
		if (prev.name < curr.name) return -1;

		return 0;
	};

	return clonedArray.sort(sortFunction);
};
