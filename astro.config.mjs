// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// En Netlify, la variable URL trae automáticamente el dominio principal del sitio
// (el .netlify.app o tu dominio propio cuando lo conectes). Así el canonical,
// el sitemap y las og:image siempre apuntan al dominio correcto sin tocar código.
const SITE_URL = process.env.URL || 'https://brandvibecrafters.netlify.app';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      priority: 1.0,
      lastmod: new Date(),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
});
