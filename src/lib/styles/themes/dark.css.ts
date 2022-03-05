import { createTheme } from '@vanilla-extract/css';
import { colors } from './index.css';

export const darkTheme = createTheme(colors, {
	text: {
		default: '#ffffff',
		contrast: '#151515',
	},
	background: {
		default: '#101010',
		contrast: '#c2c2c2',
	},
	header: {
		default: '#0b0b0b',
	},
	border: {
		default: '#202020',
		hover: '#2A2A2A',
	},
});
