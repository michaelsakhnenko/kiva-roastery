import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kiva-roastery.michael-sakhnenko.workers.dev',
  output: 'static',
  integrations: [sitemap()],
  devToolbar: {
    enabled: false
  }
});
