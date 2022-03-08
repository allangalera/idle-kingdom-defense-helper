<script>
	import '@fontsource/raleway';
	import '$lib/styles/styles.css';
	import { theme } from '$lib/shared/stores/theme';
	import { lightTheme } from '$lib/styles/themes/light.css';
	import { darkTheme } from '$lib/styles/themes/dark.css';
	import Layout from '$lib/components/Layout/index.svelte';
	import Header from '$lib/components/Header/index.svelte';
	import Main from '$lib/components/Main/index.svelte';
	import Footer from '$lib/components/Footer/index.svelte';
	import { browser } from '$app/env';
	import lazyload from 'vanilla-lazyload';

	if (browser && !document.lazyloadInstance) {
		document.lazyloadInstance = new lazyload();
	}

	$: isLightTheme = $theme === 'light';
	$: currentTheme = isLightTheme ? lightTheme : darkTheme;
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
	<title>Idle Kingdom Defense Helper</title>
	<meta name="description" content="A tool to help players from Idle Kingdom game from StormX" />
</svelte:head>

<Layout theme={currentTheme}>
	<Header />
	<Main>
		<slot />
	</Main>
	<Footer />
</Layout>
