// Importa páginas prontas de um pacote (HTML autônomo) para src/content-pages/<slug>/,
// sem alterar texto, layout, CSS nem JSON-LD. Uso:
//   node scripts/import-package.mjs <pasta-do-pacote> [<pasta-do-pacote> ...]
// Cada <pasta>/**/index.html vira uma página; img/ e arquivos da raiz vão para public/.
import fs from 'node:fs';
import path from 'node:path';
import { frameTransform } from './lib/frame.mjs';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'src', 'content-pages');
const pub = path.join(root, 'public');

const must = (c, m) => { if (!c) throw new Error(m); };
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, t) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); };

function splitPage(html) {
  const style = html.match(/<style>([\s\S]*?)<\/style>/); must(style, 'sem <style>');
  const ld = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/); must(ld, 'sem JSON-LD');
  JSON.parse(ld[1]); // valida
  const headStart = html.indexOf('<head>') + 6;
  let head = html.slice(headStart, html.indexOf('</head>'));
  head = head.replace(style[0], '').replace(ld[0], '').replace(/\n{2,}/g, '\n').trim();
  const bodyStart = html.indexOf('<body>') + 6;
  const lastScript = html.lastIndexOf('<script>');
  must(lastScript > bodyStart, 'sem script final');
  const js = html.slice(lastScript).match(/<script>([\s\S]*?)<\/script>/)[1];
  const body = html.slice(bodyStart, lastScript).trim();
  return { head, css: style[1].trim(), ld: ld[1], body, js: js.trim() };
}

function findPages(dir, base = dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'img') findPages(p, base, acc); }
    else if (e.name === 'index.html') acc.push(path.relative(base, path.dirname(p)).replace(/\\/g, '/'));
  }
  return acc;
}

for (const pkg of process.argv.slice(2)) {
  const pkgDir = path.resolve(pkg);
  for (const slug of findPages(pkgDir)) {
    const key = slug || '_home';
    const parts = splitPage(read(path.join(pkgDir, slug, 'index.html')));
    // cabeçalho/rodapé próprios saem (a moldura é única) e as âncoras da página vão para subnav.json
    const fr = frameTransform(parts.body, 'package');
    parts.body = fr.body;
    const d = path.join(outDir, key);
    // Atualiza a data de alteração (sitemap) só quando o conteúdo realmente mudou.
    const changed = !fs.existsSync(path.join(d, 'body.html')) || ['head.html', 'style.css', 'ld.json', 'body.html', 'script.js'].some((n, i) => {
      const norm = (s) => s.replace(/ srcset="[^"]*"/g, '').replace(/ sizes="[^"]*"/g, '');
      const next = [parts.head, parts.css, parts.ld, parts.body, parts.js][i] + '\n';
      return !fs.existsSync(path.join(d, n)) || norm(fs.readFileSync(path.join(d, n), 'utf8').replace(/\r\n/g, '\n')) !== norm(next);
    });
    if (changed) {
      const lm = path.join(root, 'src', 'data', 'lastmod.json');
      const map = fs.existsSync(lm) ? JSON.parse(read(lm)) : {};
      map[slug ? `/${slug.replace(/__/g, '/')}/` : '/'] = new Date().toISOString().slice(0, 10);
      write(lm, JSON.stringify(map, null, 2) + '\n');
    }
    write(path.join(d, 'head.html'), parts.head + '\n');
    write(path.join(d, 'style.css'), parts.css + '\n');
    write(path.join(d, 'ld.json'), parts.ld + '\n');
    write(path.join(d, 'body.html'), parts.body + '\n');
    write(path.join(d, 'script.js'), parts.js + '\n');
    if (fr.subnav) write(path.join(d, 'subnav.json'), JSON.stringify(fr.subnav, null, 1) + '\n');
    console.log('página', slug || '/', 'body', parts.body.length, 'css', parts.css.length);
  }
  // imagens e arquivos da raiz do domínio
  const img = path.join(pkgDir, 'img');
  if (fs.existsSync(img)) for (const f of fs.readdirSync(img)) fs.copyFileSync(path.join(img, f), (fs.mkdirSync(path.join(pub, 'img'), { recursive: true }), path.join(pub, 'img', f)));
  for (const e of fs.readdirSync(pkgDir, { withFileTypes: true }))
    if (e.isFile() && !/\.(html|md|cjs|mjs|txt|json|jsx)$/i.test(e.name) || ['site.webmanifest'].includes(e.name))
      fs.copyFileSync(path.join(pkgDir, e.name), path.join(pub, e.name));
}
