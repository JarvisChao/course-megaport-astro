import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

import sitemap from '@astrojs/sitemap';

const scssPath = resolve('src/assets/scss');
const srcPath = resolve('src');
const siteBaseUrl = 'https://jarvischao.github.io';
const siteBasePath = '/course-megaport-astro';

export default defineConfig({
  site: siteBaseUrl,
  base: siteBasePath,

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': srcPath,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [scssPath],
          additionalData: `
            @use "functions" as *;
            @use "mixins" as *;
          `,
        },
      },
    },
  },

  integrations: [
    sitemap({
      changefreq: 'daily',
    }),
  ],
});
