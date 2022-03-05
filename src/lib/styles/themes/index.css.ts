import { createGlobalTheme, createThemeContract } from '@vanilla-extract/css';

const space = {
	px: '1px',
	0.5: '0.125rem',
	1: '0.25rem',
	1.5: '0.375rem',
	2: '0.5rem',
	2.5: '0.625rem',
	3: '0.75rem',
	3.5: '0.875rem',
	4: '1rem',
	5: '1.25rem',
	6: '1.5rem',
	7: '1.75rem',
	8: '2rem',
	9: '2.25rem',
	10: '2.5rem',
	12: '3rem',
	14: '3.5rem',
	16: '4rem',
	20: '5rem',
	24: '6rem',
	28: '7rem',
	32: '8rem',
	36: '9rem',
	40: '10rem',
	44: '11rem',
	48: '12rem',
	52: '13rem',
	56: '14rem',
	60: '15rem',
	64: '16rem',
	72: '18rem',
	80: '20rem',
	96: '24rem',
};

export const fontSizes = {
	xs: '0.75rem',
	sm: '0.875rem',
	base: '1rem',
	lg: '1.125rem',
	xl: '1.25rem',
	'2xl': '1.5rem',
	'3xl': '1.875rem',
	'4xl': '2.25rem',
	'5xl': '3rem',
	'6xl': '3.75rem',
	'7xl': '4.5rem',
	'8xl': '6rem',
	'9xl': '8rem',
};

export type FontSizes = keyof typeof fontSizes;

export const root = createGlobalTheme(':root', {
	breakpoints: {
		sm: '30em',
		md: '48em',
		lg: '62em',
		xl: '80em',
		'2xl': '96em',
	},
	space: space,
	sizes: {
		...space,
		max: 'max-content',
		min: 'min-content',
		full: '100%',
		'3xs': '14rem',
		'2xs': '16rem',
		xs: '20rem',
		sm: '24rem',
		md: '28rem',
		lg: '32rem',
		xl: '36rem',
		'2xl': '42rem',
		'3xl': '48rem',
		'4xl': '56rem',
		'5xl': '64rem',
		'6xl': '72rem',
		'7xl': '80rem',
		'8xl': '90rem',
	},
	font: {
		family: {
			heading: 'Raleway',
			body: 'Raleway',
		},
		sizes: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '3.75rem',
			'7xl': '4.5rem',
			'8xl': '6rem',
			'9xl': '8rem',
		},
	},
	border: {
		radii: {
			none: '0',
			sm: '0.125rem',
			base: '0.25rem',
			md: '0.375rem',
			lg: '0.5rem',
			xl: '0.75rem',
			'2xl': '1rem',
			'3xl': '1.5rem',
			full: '9999px',
		},
		width: {
			base: '2px',
		},
	},
	baseColor: {
		white: '#ffffff',
		black: '#353535',
		heroTiers: {
			C: {
				lighter: '#d0b183',
				base: '#a16207',
				darker: '#513104',
			},
			B: {
				lighter: '#82bcab',
				base: '#047857',
				darker: '#023c2c',
			},
			A: {
				lighter: '#82bcab',
				base: '#1d4ed8',
				darker: '#0f276c',
			},
			S: {
				lighter: '#d18ed7',
				base: '#a21caf',
				darker: '#510e58',
			},
			tierList: {
				0: '#ff7f7e',
				1: '#ffbf7f',
				2: '#ffdf80',
				3: '#feff7f',
				4: '#beff7f',
				5: '#7eff80',
				6: '#7fffff',
				7: '#7fbfff',
				8: '#807fff',
				9: '#ff7ffe',
				10: '#bf7fbe',
				11: '#3b3b3b',
				12: '#858585',
				13: '#cfcfcf',
				14: '#f7f7f7',
			},
		},
	},
});

export const colors = createThemeContract({
	text: {
		default: '',
		contrast: '',
	},
	background: {
		default: '',
		contrast: '',
	},
	header: {
		default: '',
	},
	border: {
		default: '',
		hover: '',
	},
	accent: {
		base: '',
		transparency: '',
	},
	secondary: {
		base: '',
	},
});

export const theme = { ...root, colors };
