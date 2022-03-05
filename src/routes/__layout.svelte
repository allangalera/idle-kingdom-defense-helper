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

<Layout theme={currentTheme}>
	<Header />
	<Main>
		<slot />
	</Main>
	<Footer />
</Layout>
