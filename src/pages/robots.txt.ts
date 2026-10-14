const staging = process.env.SITE_ENV === 'staging';

export function GET() {
  const lines = staging
    ? ['User-agent: *', 'Disallow: /', '']
    : ['User-agent: *', 'Allow: /', '', 'Sitemap: https://aurorapremium.com/sitemap.xml', ''];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
