import { sveltekit } from '@sveltejs/kit/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), vanillaExtractPlugin()],
	ssr: {
		noExternal: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope']
	}
};

export default config;
