import { sveltekit } from '@sveltejs/kit/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import type { UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'

const config: UserConfig = {
	plugins: [sveltekit(), vanillaExtractPlugin(), tsconfigPaths()],
	// test: {
	// 	include: ['src/**/*.{test,spec}.{js,ts}']
	// },
	ssr: {
		noExternal: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope']
	}
};

export default config;
