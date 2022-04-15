<script>
  import '@fontsource/roboto';
  import '@fontsource/roboto-slab';
  import '@fontsource/fira-mono';
  import '$lib/styles/styles.css';
  import { theme, ThemeOptions } from '$lib/shared/stores/theme';
  import { lightTheme } from '$lib/styles/themes/light.css';
  import { darkTheme } from '$lib/styles/themes/dark.css';
  import Layout from '$lib/components/Layout/index.svelte';
  import Header from '$lib/components/Header/index.svelte';
  import Main from '$lib/components/Main/index.svelte';
  import Footer from '$lib/components/Footer/index.svelte';
  import Menu from '$lib/components/Menu/index.svelte';
  import { browser } from '$app/env';
  import lazyload from 'vanilla-lazyload';
  import { onMount } from 'svelte';

  if (browser && !document.lazyloadInstance) {
    document.lazyloadInstance = new lazyload();
  }

  onMount(async () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
    theme.update((currentTheme) => {
      if (currentTheme.isForced) return currentTheme;
      return {
        ...currentTheme,
        theme: isDarkMode ? ThemeOptions.dark : ThemeOptions.light,
      };
    });
    window.matchMedia('(prefers-color-scheme: dark').addEventListener('change', (event) => {
      theme.update((currentTheme) => {
        if (currentTheme.isForced) return currentTheme;
        return {
          ...currentTheme,
          theme: event.matches ? ThemeOptions.dark : ThemeOptions.light,
        };
      });
    });
  });

  $: isLightTheme = $theme.theme === ThemeOptions.light;
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
  <Menu />
</Layout>
