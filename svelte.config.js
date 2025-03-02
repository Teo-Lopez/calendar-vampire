import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	adapter: {
		pages: 'build',
		assets: 'build',
		fallback: undefined,
		precompress: false,
		strict: true
	},
	paths: {
		base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
	}
};

export default config;
