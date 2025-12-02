import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import type { Config } from '@sveltejs/kit';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '$src/*': './src/*',
      '$project/*': './*',
      '$svelte-kit/*': './.svelte-kit/types/src/routes/*'
    },
    csrf: {
      trustedOrigins: ['*']
    }
  }
} satisfies Config;
