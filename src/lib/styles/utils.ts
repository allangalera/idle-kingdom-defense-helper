import { match } from 'oxide.ts';

export const getRowStyling = (row: number, highlight = false) => {
  if (highlight) return 'highlight';
  return match(row, [[(n) => Boolean(n % 2), 'row'], () => 'otherRow']);
};

export const concatClasses = (...classes: string[]) => {
  return [...classes].join(' ');
};
