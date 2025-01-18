// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://timer.bryanhogan.com',
  trailingSlash: 'never',
  integrations: [sitemap(), svelte()],

  server: {
    host: true
  },
});