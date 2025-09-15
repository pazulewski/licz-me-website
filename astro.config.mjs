import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// Ta wersja nie zawiera już błędnego importu sitemap.
export default defineConfig({
  site: 'https://www.licz.me',
  trailingSlash: 'never',
  integrations: [tailwind()]
});

