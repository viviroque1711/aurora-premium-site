// Verifica o site publicado (ou servido localmente) contra a lista das URLs antigas.
// Uso: node scripts/verify-site.mjs <url-base> [prefixo]    ex.: http://localhost:4321   |   https://viviroque1711.github.io aurora-premium-site
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const base = process.argv[2].replace(/\/$/, '');
const prefix = process.argv[3] ? '/' + process.argv[3].replace(/^\/|\/$/g, '') : '';
const lines = (f) => fs.readFileSync(path.join(root, 'scripts', f), 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
const urls = lines('old-urls.txt');
const redirects = lines('old-redirect-urls.txt');
const phrases = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'verify-phrases.json'), 'utf8'));
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
const textOf = (h) => dec(h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ');

const rows = [];
let fail = 0;
for (const u of urls) {
  const res = await fetch(base + prefix + u);
  const html = await res.text();
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const txt = textOf(html);
  const ph = phrases[u] || [];
  const flat = (s) => s.replace(/\s+/g, '');
  const flatTxt = flat(txt);
  const phOk = ph.length ? ph.every((p) => flatTxt.includes(flat(p))) : false;
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  let ldOk = true; const types = {};
  const visit = (o) => { if (Array.isArray(o)) o.forEach(visit); else if (o && typeof o === 'object') { if (o['@type']) types[o['@type']] = (types[o['@type']] || 0) + 1; if (o['@graph']) visit(o['@graph']); } };
  for (const m of ld) { try { visit(JSON.parse(m[1])); } catch { ldOk = false; } }
  const dup = ['Organization', 'SoftwareApplication', 'FAQPage'].some((t) => types[t] > 1);
  const remoteRefs = (html.match(/horizons-cdn\.hostinger\.com|hostingerapp|images\.unsplash\.com/g) || []).length;
  // imagens locais do HTML existem?
  const imgs = [...new Set([...html.matchAll(/(?:src|srcset)="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((x) => x.trim().split(/\s+/)[0])).filter((x) => x.startsWith('/') && !x.startsWith('//')))];
  let broken = 0;
  await Promise.all(imgs.map(async (i) => { const r = await fetch(base + (prefix && !i.startsWith(prefix) ? prefix : '') + i, { method: 'HEAD' }); if (!r.ok) broken++; }));
  const ok = res.status === 200 && title && h1 === 1 && phOk && ldOk && !dup && remoteRefs === 0 && broken === 0;
  if (!ok) fail++;
  rows.push({ url: u, status: res.status, title, h1, frase: phOk ? 'ok' : 'FALTA', ld: ldOk && !dup ? 'ok' : 'ERRO', remotos: remoteRefs, imgsQuebradas: broken, imgs: imgs.length, ok });
}
for (const r of redirects) {
  const res = await fetch(base + prefix + r);
  const h = await res.text();
  const target = (h.match(/url=([^"]+)"/) || [])[1];
  const t = target && (await fetch(base + (prefix && !target.startsWith(prefix) ? prefix : '') + target));
  const ok = res.status === 200 && !!target && t && t.status === 200;
  if (!ok) fail++;
  rows.push({ url: r, status: res.status, title: '(redirecionamento → ' + target + ')', h1: '-', frase: '-', ld: '-', remotos: 0, imgsQuebradas: 0, imgs: 0, ok });
}
const nf = await fetch(base + prefix + '/nao-existe-xyz/');
rows.push({ url: '/nao-existe-xyz/', status: nf.status, title: '(404 real esperado)', h1: '-', frase: '-', ld: '-', remotos: 0, imgsQuebradas: 0, imgs: 0, ok: nf.status === 404 });
if (nf.status !== 404) fail++;
console.log('| URL antiga | status | título | h1 | frase | JSON-LD | imgs (quebradas) | refs remotas | ok |');
console.log('|---|---|---|---|---|---|---|---|---|');
for (const r of rows) console.log(`| ${r.url} | ${r.status} | ${r.title} | ${r.h1} | ${r.frase} | ${r.ld} | ${r.imgs} (${r.imgsQuebradas}) | ${r.remotos} | ${r.ok ? 'OK' : 'FALHA'} |`);
console.log(`\n${rows.length - fail}/${rows.length} OK`);
process.exit(fail ? 1 : 0);
