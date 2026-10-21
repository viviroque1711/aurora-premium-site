const staging = process.env.SITE_ENV === 'staging';

// Robôs de busca e de IA com permissão explícita de rastrear tudo (lista em scripts/bots.mjs, a mesma do monitor).
import { BOTS } from '../../scripts/bots.mjs';

export function GET() {
  const lines = [];
  // Teste: rastreável (o Rich Results Test precisa abrir as páginas); a indexação é barrada pelo noindex de cada página.
  for (const b of BOTS) lines.push(`User-agent: ${b}`, 'Allow: /', '');
  lines.push('User-agent: *', 'Allow: /', '');
  if (!staging) lines.push('Sitemap: https://aurorapremium.com/sitemap.xml', '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
