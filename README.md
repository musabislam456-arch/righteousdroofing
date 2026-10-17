# RIGHTEOUS-D ROOFING COMPANY — Astro website

A responsive, static-first Astro website for RIGHTEOUS-D ROOFING COMPANY, Kumasi, Ghana. The design uses a custom architectural illustration, strong typography, a charcoal / warm-paper / construction-orange palette, direct phone actions, the supplied review excerpts, and the exact Google Maps embed supplied by the owner.

## Current content and asset caveat

This project is a complete frontend implementation, but authentic company assets remain a launch dependency:

- **Official logo:** not found in the public search results reviewed. The roof-shaped wordmark, favicon and social graphic are temporary original design assets created for this site; they are not represented as the official company logo.
- **Authentic project photos / before-and-after photos:** not found in the public results reviewed. The project showcase currently uses original vector illustrations with visible labels stating that they are not photographs of company projects. Replace those frames with genuine Righteous-D images before publishing the public site as a completed portfolio.
- **Official social profiles:** searches did not reveal an attributable official profile. No social links have been invented.
- **WhatsApp:** no WhatsApp action is included because support for the supplied phone number could not be independently confirmed. The phone link is implemented.

The user-supplied review excerpts, 5.0 rating / 14-review figure, address, phone, three service types, exact map embed and directions URL are included. The Tarkwa and Kintampo mentions are explicitly described as customer-referenced locations rather than a complete list of service areas. This build does not invent rates, guarantees, warranties, certifications, company history or years of experience.

The supplied domain `https://righteousdroofing.utilix.site/` was added to SEO, canonical, Open Graph, sitemap and robots configuration. The domain returned **502 Bad Gateway** when directly checked during research, so live domain control, DNS, and deployment routing still need to be confirmed with the site host.

## Requirements

- Node.js 20.3.0 or later (Node 22 LTS recommended)
- npm

## Install and run locally

```bash
npm install
npm run dev
```

Astro prints a local development URL (normally `http://localhost:4321`). Open that URL in a browser.

## Production build

```bash
npm run build
npm run preview
```

The static production site is output to `dist/`. The project has no database, backend, API service, admin panel or chatbot. The contact path is a `tel:` link, and navigation, the map, Google review link, directions link, and mobile menu work in the frontend.

## Deployment

Deploy the contents of `dist/` to a static host (for example, the host serving the supplied domain). Configure the host to serve `/` and `/sitemap.xml` correctly and enable HTTPS. The sitemap and canonical metadata use the domain in the single configuration file below.

### Domain configuration

Update **`site.config.mjs`** if the production domain changes. Its `siteUrl` is the single domain setting consumed by Astro, canonical/Open Graph metadata, structured business data and the generated sitemap. `public/robots.txt` also points to the supplied domain's sitemap; update that line if you change domains.

Current value:

```js
siteUrl: 'https://righteousdroofing.utilix.site/'
```

## Where to replace the company assets

- Replace the temporary roof mark in `src/components/BrandMark.astro` with the approved logo if supplied.
- Replace `public/favicon.svg` with the official logo-derived favicon if available.
- Replace `public/og-image.png` with a branded export once the logo and real project photography are approved. Keep it at 1200 × 630 px and preserve a clear focal area for social-platform cropping.
- Replace the inline SVG drawings inside the `Project showcase` section of `src/pages/index.astro` with genuine, owner-approved before-and-after photographs. Keep image captions grounded in confirmed project details and remove the illustration disclaimer only after authentic photos have replaced the current drawings.
- The Open Graph URL and canonical are already based on the supplied domain in `site.config.mjs`.

## SEO and accessibility included

- Descriptive title and meta description
- Canonical link, Open Graph fields, Twitter large-card metadata, PNG social preview and SVG favicon
- `RoofingContractor` JSON-LD using only the supplied company details and supplied Google listing summary
- Static sitemap and robots.txt
- Semantic sections and headings, descriptive iframe title, image/illustration labels, visible keyboard-focus outlines, responsive layouts and reduced-motion support
- Lazy-loaded Google Maps embed and minimal JavaScript for the mobile menu and progressive reveal

## Project structure

```text
.
├── astro.config.mjs
├── site.config.mjs              # site URL and approved business details
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   └── site.webmanifest
├── research/
│   └── competitor-review.md     # reviewed competitor/industry pages and design notes
└── src/
    ├── components/              # header, brand mark, service, review and footer elements
    ├── layouts/BaseLayout.astro # metadata, JSON-LD and document shell
    ├── pages/index.astro        # full homepage
    ├── pages/sitemap.xml.ts     # generated static sitemap
    ├── pages/robots.txt.ts      # generated robots file
    └── styles/global.css        # responsive site design system
```

## Notes from competitor research

The project notes cover 24 unique public pages across Ghanaian roofing and construction companies/directories. Patterns worth using included direct contact visibility, branch/map information, service grouping, material/roofing education and project evidence. To distinguish RIGHTEOUS-D, the implementation avoids inflated “best in Ghana” claims, fake warranties, unrelated competitor photos, unconfirmed WhatsApp support, and fabricated review quotes. The full notes include every reviewed URL and the limitations encountered.
