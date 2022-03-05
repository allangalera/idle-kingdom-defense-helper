import { globalFontFace, globalStyle } from '@vanilla-extract/css';

globalFontFace('HeadingFont', {
	src: 'local("Raleway")',
});

globalStyle('html, body', {
	minWidth: '100vw',
	minHeight: '100vh',
	margin: 0,
});

globalStyle('*, *::after, *::before', {
	boxSizing: 'border-box',
});
