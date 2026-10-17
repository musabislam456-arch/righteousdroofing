import { defineConfig } from 'astro/config';
import { siteConfig } from './site.config.mjs';

export default defineConfig({
  site: siteConfig.siteUrl,
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      cssCodeSplit: true
    }
  }
});
