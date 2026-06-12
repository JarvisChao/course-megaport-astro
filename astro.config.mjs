import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

import sitemap from '@astrojs/sitemap';

const scssPath = fileURLToPath(new URL('./src/assets/scss', import.meta.url));
const srcPath = fileURLToPath(new URL('./src', import.meta.url));
const siteBaseUrl = 'https://jarvischao.github.io';
const siteBasePath = '/course-megaport';

export default defineConfig({
  site: siteBaseUrl,
  base: siteBasePath,
  trailingSlash: 'always',

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
