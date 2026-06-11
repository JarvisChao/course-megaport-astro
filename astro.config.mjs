import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const scssPath = fileURLToPath(new URL('./src/assets/scss', import.meta.url));
const srcPath = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  site: 'https://jarvischao.github.io',
  base: '/course-megaport',
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
});
