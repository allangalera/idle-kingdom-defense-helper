import { createTheme } from '@vanilla-extract/css';
import { themeColors } from './index.css';
import {
	slateDark,
	redDark,
	greenDark,
	yellowDark,
	blueDark,
	plumDark,
	amberDark,
	orangeDark,
} from '@radix-ui/colors';

export const darkTheme = createTheme(themeColors, {
	baseColors: {
		...slateDark,
		...redDark,
		...greenDark,
		...yellowDark,
		...blueDark,
		...plumDark,
		...amberDark,
		...orangeDark,
	},
	text: {
		default: '#ffffff',
		contrast: '#151515',
	},
	background: {
		default: '#0D0D0D',
		contrast: '#c2c2c2',
	},
	header: {
		default: '#0D0D0D',
	},
	border: {
		default: '#404040',
		hover: '#808080',
	},
	accent: {
		base: '#783cb7',
		transparency: ' #783cb728',
	},
	secondary: {
		base: '#48dc81',
	},
});
