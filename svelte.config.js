import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-auto';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import preprocess from 'svelte-preprocess';

// import { imagetools } from 'vite-imagetools';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess(), mdsvex(mdsvexConfig)],

  kit: {
    adapter: adapter(),
    // hydrate the <div id="svelte"> element in src/app.html
    vite: {
      // define: {
      // 	'process.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString()),
      // },
      // plugins: [vanillaExtractPlugin(), imagetools({ force: true })],
      plugins: [vanillaExtractPlugin()],
      // ssr:
      // 	process.env.NODE_ENV === 'development'
      // 		? {}
      // 		: {
      // 				noExternal: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope'],
      // 		  },
    },
  },
};

export default config;
