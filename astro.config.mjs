// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import sitemap from '@astrojs/sitemap';

import svelte from '@astrojs/svelte';

// Rewrites dist/sw.js after build: appends every dist/_astro/* path to the
// precache list and derives CACHE_VERSION from a hash of those filenames so
// each new build invalidates the previous service worker cache automatically.
function pwaPrecache() {
  return {
    name: 'pwa-precache',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const swPath = path.join(distDir, 'sw.js');
        if (!fs.existsSync(swPath)) {
          logger.warn('sw.js not found in dist; skipping precache injection');
          return;
        }

        const astroDir = path.join(distDir, '_astro');
        const built = fs.existsSync(astroDir)
          ? fs.readdirSync(astroDir).sort().map((f) => `/_astro/${f}`)
          : [];

        const hash = crypto.createHash('sha1');
        for (const f of built) hash.update(f);
        const version = `flow-timer-${hash.digest('hex').slice(0, 8)}`;

        const injected = built.map((f) => `  '${f}',`).join('\n');
        let sw = fs.readFileSync(swPath, 'utf8');
        sw = sw.replace(/'flow-timer-dev'/, `'${version}'`);
        sw = sw.replace(/^\s*\/\/ __BUILD_ASSETS__\s*$/m, injected);
        fs.writeFileSync(swPath, sw, 'utf8');

        logger.info(`pwa-precache: ${built.length} _astro asset(s), version ${version}`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://timer.bryanhogan.com',
  trailingSlash: 'never',
  integrations: [sitemap(), svelte(), pwaPrecache()],

  server: {
    host: true
  },
});