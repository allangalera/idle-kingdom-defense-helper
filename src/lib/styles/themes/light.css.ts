import { createTheme } from '@vanilla-extract/css';
import { themeColors } from './index.css';
import {
	gray,
	red,
	green,
	yellow,
	blue,
	plum,
	amber,
	orange,
	brown,
	grayA,
} from '@radix-ui/colors';

export const lightTheme = createTheme(themeColors, {
	baseColors: {
		...gray,
		...grayA,
		...red,
		...green,
		...yellow,
		...blue,
		...plum,
		...amber,
		...orange,
		...brown,
	},
	text: {
		default: '#1b1b1b',
		contrast: '#ffffff',
	},
	background: {
		default: '#E6E6E6',
		contrast: '#0b0b0b',
	},
	header: {
		default: '#E6E6E6',
	},
	border: {
		default: '#CCCCCC',
		hover: '#999999',
	},
	accent: {
		base: '#783cb7',
		transparency: ' #783cb728',
	},
	secondary: {
		base: '#48dc81',
	},
});
