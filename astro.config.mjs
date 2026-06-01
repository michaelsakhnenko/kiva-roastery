import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://kiva-roastery.michael-sakhnenko.workers.dev',
  output: 'static',
  integrations: [sitemap()],

  devToolbar: {
    enabled: false
  },

  adapter: cloudflare()
});