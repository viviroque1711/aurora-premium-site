// Migra as páginas antigas (React da Horizons, já pré-renderizadas) para HTML estático.
// Uso: node scripts/import-legacy.mjs <pasta-com-os-html-baixados> <legacy.css>
//   - cada <pasta>/<slug>.html (barras do caminho trocadas por "__") vira src/content-pages/<slug>/{head,body}.html
//   - imagens do CDN da Horizons e do Unsplash são baixadas para public/img/legacy/
//   - botões viram links (Entrar, Teste Grátis, WhatsApp...); o resto do comportamento está em public/legacy.js
//   - o JSON-LD global fixo é descartado: ficam só os blocos próprios de cada página
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { frameTransform } from './lib/frame.mjs';

const root = path.resolve(import.meta.dirname, '..');
const [rawDir, cssFile] = process.argv.slice(2).map((p) => path.resolve(p));
const outDir = path.join(root, 'src', 'content-pages');
const imgDir = path.join(root, 'public', 'img', 'legacy');
fs.mkdirSync(imgDir, { recursive: true });
fs.copyFileSync(cssFile, path.join(root, 'public', 'legacy.css'));

const SITE = 'https://aurorapremium.com';
const SIGNUP = 'https://app.aurorapremium.com/auth?mode=signup';
const LOGIN = 'https://app.aurorapremium.com/auth?mode=login';
const WA = 'https://api.whatsapp.com/send?phone=5511973967161';
const WA_ESPECIALISTA = WA + '&text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista%20sobre%20o%20Aurora%20Premium.';

const must = (c, m) => { if (!c) throw new Error(m); };
const decodeAmp = (s) => s.replace(/&amp;/g, '&');
const URL_RE = /https:\/\/(?:horizons-cdn\.hostinger\.com\/[^"'\s)<>,\\]+|images\.unsplash\.com\/[^"'\s)<>,\\]+)/g;

// ---- 1) coleta e baixa os arquivos remotos (uma vez cada) ----
const files = fs.readdirSync(rawDir).filter((f) => f.endsWith('.html'));
const remote = new Set();
for (const f of files) for (const m of fs.readFileSync(path.join(rawDir, f), 'utf8').matchAll(URL_RE)) remote.add(decodeAmp(m[0]));
const local = new Map(); // url remota (decodificada) -> nome do arquivo local
const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/avif': '.avif' };
for (const url of remote) {
  const isCdn = url.includes('horizons-cdn');
  let name = isCdn ? url.split('/').pop() : 'unsplash-' + crypto.createHash('md5').update(url).digest('hex').slice(0, 10);
  const existing = fs.readdirSync(imgDir).find((x) => x === name || x.startsWith(name + '.'));
  if (existing) { local.set(url, existing); continue; }
  const res = await fetch(url);
  must(res.ok, 'falha ao baixar ' + url + ' ' + res.status);
  if (!isCdn) name += EXT[(res.headers.get('content-type') || '').split(';')[0]] || '.jpg';
  fs.writeFileSync(path.join(imgDir, name), Buffer.from(await res.arrayBuffer()));
  local.set(url, name);
}
const toLocal = (s, prefix) => s.replace(URL_RE, (m) => { const f = local.get(decodeAmp(m)); must(f, 'sem arquivo local para ' + m); return prefix + '/img/legacy/' + f; });

// ---- 2) cabeçalho fixo de todas as páginas antigas ----
const HEAD_COMMON = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="googlebot" content="index, follow">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0A0A0F">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>.prerender-shell *{opacity:1!important;transform:none!important}[data-btn]{display:inline-block;text-align:center}</style>
<link rel="stylesheet" href="/legacy.css">`;

function convertButtons(body) {
  return body.replace(/<button([^>]*)>([\s\S]*?)<\/button>/g, (all, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, '').trim();
    const aria = (attrs.match(/aria-label="([^"]*)"/) || [])[1] || '';
    const link = (href) => `<a${attrs} href="${href}" target="_blank" rel="noopener" data-btn>${inner}</a>`;
    if (text === 'Entrar') return link(LOGIN);
    if (['Teste Grátis', 'Teste o Aurora Premium', 'Começar Agora'].includes(text)) return link(SIGNUP);
    if (text === 'Falar com um especialista') return link(WA_ESPECIALISTA);
    if (aria === 'Entre em contato pelo WhatsApp') return link(WA);
    return all; // menu, filtros do blog e índice dos termos: tratados por /legacy.js
  });
}

for (const f of files) {
  const slug = f.replace(/\.html$/, '').replace(/__/g, '/');
  const html = fs.readFileSync(path.join(rawDir, f), 'utf8');
  // parte específica da página: do <head> até o primeiro <meta charset> (título, metas, og, JSON-LD próprio)
  const hs = html.indexOf('<head>') + 6;
  const he = html.indexOf('<meta charset', hs);
  must(hs > 6 && he > hs, 'cabeçalho não reconhecido em ' + f);
  const pageHead = html.slice(hs, he).trim();
  must(pageHead.startsWith('<title>'), 'head sem <title> em ' + f);
  const ldBlocks = [...pageHead.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  ldBlocks.forEach((m) => JSON.parse(m[1]));
  let pageHeadFinal = pageHead;
  if (!ldBlocks.length) {
    // Páginas sem dados estruturados próprios (antes dependiam do bloco global): WebPage + BreadcrumbList, sem inventar nada.
    const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const title = dec(pageHead.match(/<title>([^<]*)<\/title>/)[1]);
    const desc = dec(pageHead.match(/<meta name="description" content="([^"]*)"/)[1]);
    const short = title.replace(/ \| Aurora Premium$/, '');
    const url = `${SITE}/${slug}/`;
    const crumbs = [{ name: 'Início', url: SITE + '/' }];
    if (slug.startsWith('blog/')) crumbs.push({ name: 'Blog', url: SITE + '/blog/' });
    crumbs.push({ name: short, url });
    const ld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description: desc, inLanguage: 'pt-BR', isPartOf: { '@id': SITE + '/#website' }, publisher: { '@id': SITE + '/#org' } },
      { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) },
    ] };
    pageHeadFinal += `
<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
  }

  const bs = html.indexOf('<div id="root">');
  const be = html.lastIndexOf('</body>');
  must(bs > 0 && be > bs, 'sem #root em ' + f);
  let body = html.slice(bs, be).trim();
  body = convertButtons(body.replace(/ data-discover="true"/g, ''));
  body = frameTransform(body, 'legacy').body; // cabeçalho, rodapé e WhatsApp saem: a moldura é única
  body += '\n<script src="/legacy.js" defer></script>';

  const dir = path.join(outDir, slug.replace(/\//g, '__'));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'head.html'), toLocal(pageHeadFinal, SITE) + '\n' + HEAD_COMMON + '\n');
  fs.writeFileSync(path.join(dir, 'body.html'), toLocal(body, '') + '\n');
  console.log('página', slug, 'JSON-LD próprios:', ldBlocks.length);
}
