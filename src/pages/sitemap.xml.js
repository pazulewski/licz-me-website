import { pages } from '../utils/pages';

const site = 'https://www.licz.me';

// Ten plik to "endpoint", który dynamicznie generuje sitemapę
export async function GET() {
  const allPages = await Astro.glob('./kalkulator-*.astro');
  const otherPages = [
    { url: '' }, // Strona główna
    // Tutaj można dodać inne, nietypowe strony w przyszłości
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${otherPages.map((page) => `<url><loc>${site}${page.url}</loc></url>`).join('')}
  ${allPages.map((page) => `<url><loc>${site}${page.url.replace('/pages', '')}</loc></url>`).join('')}
</urlset>`.trim();

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
