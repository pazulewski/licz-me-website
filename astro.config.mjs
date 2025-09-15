import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: 'https://www.licz.me',
  trailingSlash: 'never',
  integrations: [tailwind()]
});

