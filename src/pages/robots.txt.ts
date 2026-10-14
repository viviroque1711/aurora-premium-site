export function GET() {
  return new Response(
    ['User-agent: *', 'Allow: /', '', 'Sitemap: https://aurorapremium.com/sitemap.xml', ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
