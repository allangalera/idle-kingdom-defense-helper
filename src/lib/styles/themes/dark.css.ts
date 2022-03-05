import { createTheme } from '@vanilla-extract/css';
import { colors } from './index.css';

export const darkTheme = createTheme(colors, {
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
