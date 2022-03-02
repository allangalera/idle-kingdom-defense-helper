import * as vars from '$lib/styles/vars.css';

import { globalFontFace, globalStyle } from '@vanilla-extract/css';

globalFontFace('HeadingFont', {
	src: 'local("Raleway")',
});

globalStyle('html, body', {
	vars: {
		[vars.desktopBreakpoint]: '48rem',
		[vars.fontFamilyHeading]: 'Raleway',
		[vars.fontFamilyBody]: 'Raleway',
		[vars.fontSizeRoot]: '16px',
		[vars.fontSize0]: '0.8rem',
		[vars.fontSize1]: '1rem',
		[vars.fontSize2]: '1.25rem',
		[vars.fontSize3]: '1.563rem',
		[vars.fontSize4]: '1.953rem',
		[vars.fontSize5]: '2.441rem',
		[vars.fontSize6]: '3.052rem',
		[vars.fontSize7]: '3.815rem',
		[vars.fontWeightBold]: '700',
		[vars.fontWeightBlack]: '900',
		[vars.lineHeightRelaxed]: '1.75',
		[vars.spacingPx]: '1px',
		[vars.spacing0]: '0',
		[vars.spacing1]: '0.25rem',
		[vars.spacing2]: '0.5rem',
		[vars.spacing3]: '0.75rem',
		[vars.spacing4]: '1rem',
		[vars.spacing5]: '1.25rem',
		[vars.spacing6]: '1.5rem',
		[vars.spacing8]: '2.0rem',
		[vars.spacing12]: '3.0rem',
		[vars.tiers.C.lighter]: '#d0b183',
		[vars.tiers.C.base]: '#a16207',
		[vars.tiers.C.darker]: '#513104',
		[vars.tiers.B.lighter]: '#82bcab',
		[vars.tiers.B.base]: '#047857',
		[vars.tiers.B.darker]: '#023c2c',
		[vars.tiers.A.lighter]: '#82bcab',
		[vars.tiers.A.base]: '#1d4ed8',
		[vars.tiers.A.darker]: '#0f276c',
		[vars.tiers.S.lighter]: '#d18ed7',
		[vars.tiers.S.base]: '#a21caf',
		[vars.tiers.S.darker]: '#510e58',
		[vars.tierList.rank0]: '#ff7f7e',
		[vars.tierList.rank1]: '#ffbf7f',
		[vars.tierList.rank2]: '#ffdf80',
		[vars.tierList.rank3]: '#feff7f',
		[vars.tierList.rank4]: '#beff7f',
		[vars.tierList.rank5]: '#7eff80',
		[vars.tierList.rank6]: '#7fffff',
		[vars.tierList.rank7]: '#7fbfff',
		[vars.tierList.rank8]: '#807fff',
		[vars.tierList.rank9]: '#ff7ffe',
		[vars.tierList.rank10]: '#bf7fbe',
		[vars.tierList.rank11]: '#3b3b3b',
		[vars.tierList.rank12]: '#858585',
		[vars.tierList.rank13]: '#cfcfcf',
		[vars.tierList.rank14]: '#f7f7f7',
		[vars.defaultTextColor]: '#353535',
		[vars.contrastTextColor]: '#f5f3f4',
		[vars.borderRadius]: '0.5rem',
	},
	fontFamily: [vars.fontFamilyBody],
	fontWeight: 400,
});

globalStyle('body', {
	margin: [vars.spacing0],
});

globalStyle('*, *::after, *::before', {
	boxSizing: 'border-box',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
	fontFamily: [vars.fontFamilyHeading],
	fontSize: [vars.fontSize1],
	color: [vars.defaultTextColor],
	margin: 0,
	fontWeight: 600,
});

globalStyle('p', {
	fontFamily: [vars.fontFamilyBody],
	fontSize: [vars.fontSize1],
	color: [vars.defaultTextColor],
});

globalStyle('b, strong', {
	fontFamily: [vars.fontFamilyBody],
	fontSize: [vars.fontSize1],
	color: [vars.defaultTextColor],
	fontWeight: 600,
});

globalStyle('button', {
	cursor: 'pointer',
	padding: [vars.spacing2, vars.spacing4],
	fontSize: [vars.fontSize2],
	fontFamily: [vars.fontFamilyHeading],
	fontWeight: [vars.fontWeightBlack],
	lineHeight: [vars.lineHeightRelaxed],
	borderStyle: 'none',
	borderRadius: [vars.spacing2],
	'@media': {
		'(prefers-reduced-motion: no-preference)': {
			transition: ['color', '250ms'],
		},
		'(prefers-reduced-motion: reduce)': {
			transition: ['color', '2000ms'],
		},
	},
});
