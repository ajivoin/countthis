import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

import { defineConfig } from 'vite';

export default defineConfig({
	base: '/countthis/',
	plugins: [
		sveltekit(),
		// SvelteKitPWA(),
	],
	build: {
		outDir: "/dist"
	}
});
