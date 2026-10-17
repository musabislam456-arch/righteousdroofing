import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config.mjs';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', siteConfig.siteUrl).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
