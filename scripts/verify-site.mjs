import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { siteConfig } from '../site.config.mjs';

const read = (p) => readFile(new URL(`../${p}`, import.meta.url), 'utf8');
const index = await read('src/pages/index.astro');
const css = await read('src/styles/global.css');
const layout = await read('src/layouts/BaseLayout.astro');
const configSource = await read('site.config.mjs');
const sitemap = await read('src/pages/sitemap.xml.ts');
const robots = await read('src/pages/robots.txt.ts');
const reviewComponent = await read('src/components/ReviewQuote.astro');
const brandComponent = await read('src/components/BrandMark.astro');
const headerComponent = await read('src/components/Header.astro');
const serviceComponent = await read('src/components/ServiceItem.astro');
const footerComponent = await read('src/components/Footer.astro');

const results = [];
function check(name, fn) {
  try { fn(); results.push({ name, ok: true }); }
  catch (error) { results.push({ name, ok: false, error: error.message }); }
}

check('Domain is centralized in site.config.mjs', () => {
  assert.equal(siteConfig.siteUrl, 'https://righteousdroofing.utilix.site/');
  assert.match(configSource, /siteUrl:/);
});
check('Verified company phone and contact action', () => {
  assert.equal(siteConfig.phoneHref, 'tel:+233594468782');
  assert.ok(index.includes('siteConfig.phoneHref'));
});
check('Exact supplied Google Maps embed and directions URL', () => {
  assert.ok(configSource.includes('!4v1792233447611'));
  assert.equal(siteConfig.mapsUrl, 'https://maps.app.goo.gl/XP12uFLB2LbrYXGW9');
  assert.ok(index.includes('siteConfig.mapsEmbed'));
  assert.ok(index.includes('siteConfig.mapsUrl'));
});
check('All 11 supplied review excerpts/names are included', () => {
  const names = ['Adetsi Sampson','Ayim Daniel','Michael Asaah','Enoch Frimpong','Lil King','ADOMGRACE PIXELS (Emeritus Sammy Grace)','Atta','Kofi Abekah','Dasty Cartar','Esther Owusu','George Arthur'];
  for (const name of names) assert.ok(index.includes(name), `Missing reviewer: ${name}`);
  assert.equal((index.match(/\{ name: '/g) || []).length, 11, 'Expected 11 review objects');
  assert.ok(reviewComponent.includes('<blockquote>“{quote}”</blockquote>'));
});
check('Required sections and matching anchor targets exist', () => {
  const required = ['home','services','work','reviews','location','contact'];
  for (const id of required) {
    assert.ok(index.includes(`id="${id}"`), `Missing section ID: ${id}`);
    assert.ok([index, brandComponent, headerComponent, serviceComponent, footerComponent].some((source) => source.includes(`href="#${id}"`)), `Missing navigation link: #${id}`);
  }
  for (const id of ['services-heading','work-heading','locations-heading','reviews-heading','location-heading']) {
    assert.ok(index.includes(`id="${id}"`), `Missing labelled section heading prop: ${id}`);
  }
});
check('Responsive CSS and reduced-motion support exist', () => {
  assert.ok(css.includes('@media (max-width: 860px)'));
  assert.ok(css.includes('@media (max-width: 640px)'));
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'));
  assert.ok(css.includes('.map-frame iframe'));
});
check('SEO metadata, canonical, Open Graph and JSON-LD are present', () => {
  for (const tag of ['rel="canonical"','property="og:image"','name="twitter:card"','application/ld+json','RoofingContractor']) {
    assert.ok(layout.includes(tag), `Missing SEO element: ${tag}`);
  }
  assert.ok(existsSync(new URL('../public/og-image.png', import.meta.url)));
  assert.ok(existsSync(new URL('../public/favicon.svg', import.meta.url)));
});
check('Generated sitemap and robots use the central domain config', () => {
  assert.ok(sitemap.includes('siteConfig.siteUrl'));
  assert.ok(robots.includes("new URL('/sitemap.xml', siteConfig.siteUrl)"));
  assert.ok(sitemap.includes('export const prerender = true'));
  assert.ok(robots.includes('export const prerender = true'));
});
check('No unconfirmed WhatsApp action is included', () => {
  assert.ok(!index.includes('wa.me/'));
  assert.ok(!layout.includes('whatsapp'));
});
check('Custom gallery artwork discloses that it is not project photography', () => {
  assert.ok(index.includes('ILLUSTRATION'));
  assert.ok(index.includes('not completed RIGHTEOUS-D projects'));
  assert.ok(index.includes('Customer review excerpts supplied'));
});

for (const result of results) {
  console.log(`${result.ok ? 'PASS' : 'FAIL'} ${result.name}${result.ok ? '' : ` — ${result.error}`}`);
}
console.log(`\n${results.filter(r => r.ok).length}/${results.length} checks passed.`);
if (results.some(r => !r.ok)) process.exitCode = 1;
