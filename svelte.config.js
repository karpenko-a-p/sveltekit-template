// import adapter from '@sveltejs/adapter-node';
import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '$src/*': './src/*',
      '$project/*': './*',
      '$svelte-kit/*': './.svelte-kit/types/src/routes/*'
    }
  }
};
