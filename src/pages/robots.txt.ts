const staging = process.env.SITE_ENV === 'staging';

export function GET() {
  const lines = staging
    // Teste: rastreável (o Rich Results Test precisa abrir as páginas); a indexação é barrada pelo noindex de cada página.
    ? ['User-agent: *', 'Allow: /', '']
    : ['User-agent: *', 'Allow: /', '', 'Sitemap: https://aurorapremium.com/sitemap.xml', ''];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
