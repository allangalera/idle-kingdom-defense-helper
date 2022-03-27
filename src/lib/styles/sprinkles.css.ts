import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { theme } from './themes/index.css';
import { darkTheme } from './themes/dark.css';

const responsiveProperties = defineProperties({
	conditions: {
		mobile: {},
		tablet: { '@media': 'screen and (min-width: 768px)' },
		desktop: { '@media': 'screeen and (min-width: 1024px)' },
	},
	defaultCondition: 'mobile',
	properties: {
		display: ['none', 'flex', 'block', 'inline'],
		flexDirection: ['row', 'column'],
		justifyContent: [
			'stretch',
			'flex-start',
			'center',
			'flex-end',
			'space-around',
			'space-between',
		],
		alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
		width: theme.sizes,
		height: theme.sizes,
		paddingTop: theme.space,
		paddingBottom: theme.space,
		paddingLeft: theme.space,
		paddingRight: theme.space,
		fontSize: theme.font.fontSizes,
		fontWeight: theme.font.fontWeights,
		lineHeight: theme.font.lineHeights,
		letterSpacing: theme.font.letterSpacings,
		textAlign: ['left', 'center', 'right', 'start', 'end'],
		cursor: ['pointer', 'not-allowed'],
		opacity: [0, 0.5, 1],
	},
	shorthands: {
		padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
		paddingX: ['paddingLeft', 'paddingRight'],
		paddingY: ['paddingBottom', 'paddingTop'],
		placeItems: ['justifyContent', 'alignItems'],
		size: ['width', 'height'],
	},
});

const colorProperties = defineProperties({
	conditions: {
		lightMode: {},
		darkMode: { selector: `.${darkTheme} &` },
	},
	defaultCondition: 'lightMode',
	properties: {
		background: { ...theme.themeColors.baseColors, ...theme.colors },
		color: { ...theme.themeColors.baseColors, ...theme.colors },
		borderColor: { ...theme.themeColors.baseColors, ...theme.colors },
	},
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
