import { defineConfig } from 'astro/config';
import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jarvischao.github.io',
  base: '/course-megaport-astro',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [resolve('src/assets/scss')],
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
