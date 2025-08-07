
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // WAŻNE: Podaj tutaj adres swojej strony
  site: 'https://licz.me',
  integrations: [tailwind(), sitemap()]
});

