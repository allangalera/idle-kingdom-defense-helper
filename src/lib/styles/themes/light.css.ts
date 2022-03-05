import { createTheme } from '@vanilla-extract/css';
import { colors } from './index.css';

export const lightTheme = createTheme(colors, {
	text: {
		default: '#1b1b1b',
		contrast: '#ffffff',
	},
	background: {
		default: '#ebebeb',
		contrast: '#0b0b0b',
	},
	header: {
		default: '#D7D7D7',
	},
	border: {
		default: '#aeaeae',
		hover: '#868686',
	},
});
