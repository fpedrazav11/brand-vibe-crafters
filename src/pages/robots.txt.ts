import type { APIRoute } from 'astro';
import seo from '../data/seo.json';

export const GET: APIRoute = ({ site }) => {
  const production = (process.env.CONTEXT ?? 'production') === 'production';
  const allow = seo.indexable && production;
  const body = allow
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
