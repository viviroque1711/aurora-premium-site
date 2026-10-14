import { execSync } from 'node:child_process';
import { LLMS } from '../data/llms.mjs';

const heads = import.meta.glob('/src/content-pages/*/head.html', { query: '?raw', import: 'default', eager: true });

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function lastmod(dir) {
  try {
    const d = execSync(`git log -1 --format=%cs -- "src/content-pages/${dir}"`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    if (d) return d;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

/** Todas as páginas importadas de pacotes: caminho, título, descrição, lastmod e dados do llms.txt. */
export function contentPages() {
  return Object.entries(heads).map(([file, head]) => {
    const dir = file.split('/').slice(-2, -1)[0];
    const path = dir === '_home' ? '/' : `/${dir}/`;
    const title = decode(head.match(/<title>([^<]*)<\/title>/)[1]);
    const description = decode(head.match(/<meta name="description" content="([^"]*)"/)[1]);
    return { dir, path, title, description, lastmod: lastmod(dir), ...(LLMS[path] || {}) };
  }).sort((a, b) => a.path.localeCompare(b.path));
}

const parts = import.meta.glob('/src/content-pages/*/*', { query: '?raw', import: 'default', eager: true });

/** Pedaços (head, css, ld, body, js) de uma página importada. */
export function pageParts(dir) {
  const get = (name) => parts[`/src/content-pages/${dir}/${name}`];
  return { head: get('head.html'), css: get('style.css'), ld: get('ld.json'), body: get('body.html'), js: get('script.js') };
}

export function pageDirs() {
  return [...new Set(Object.keys(parts).map((f) => f.split('/').slice(-2, -1)[0]))];
}
