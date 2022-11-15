import { match } from 'oxide.ts';

export const getRowStyling = (row: number, highlight = false) => {
	return match({ row, highlight }, [
		[{ highlight: true }, 'highlight' as const],
		[({ row }) => Boolean(row % 2), 'row' as const],
		() => 'otherRow' as const
	]);
};

export const concatClasses = (...classes: string[]) => {
	return [...classes].join(' ');
};
