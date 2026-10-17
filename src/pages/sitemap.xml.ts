import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config.mjs';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteConfig.siteUrl}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
