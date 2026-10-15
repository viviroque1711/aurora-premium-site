// Imagens responsivas: gera as versões 640/1024/1600 px (só as menores que a arte original) e
// põe srcset + sizes e width/height em toda <img src="/img/..."> das páginas. Pode rodar de novo sem efeito.
// Rode depois de importar um pacote novo:  node scripts/optimize-images.mjs
// scripts/img-sizes.json guarda a largura renderizada de cada imagem (390 e 1440 px) para montar o sizes.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const pub = path.join(root, 'public');
const pagesDir = path.join(root, 'src', 'content-pages');
const sizesFile = path.join(import.meta.dirname, 'img-sizes.json');
const measured = fs.existsSync(sizesFile) ? JSON.parse(fs.readFileSync(sizesFile, 'utf8')) : {};
const WIDTHS = [640, 1024, 1600];
const meta = new Map();

async function dims(src) {
  if (!meta.has(src)) {
    const m = await sharp(path.join(pub, src)).metadata();
    meta.set(src, { w: m.width, h: m.height });
  }
  return meta.get(src);
}

async function variant(src, w) {
  const ext = path.extname(src);
  const out = src.slice(0, -ext.length) + `-${w}w` + ext;
  const file = path.join(pub, out);
  if (!fs.existsSync(file)) {
    let img = sharp(path.join(pub, src)).resize({ width: w, withoutEnlargement: true });
    if (ext === '.webp') img = img.webp({ quality: 80 });
    else if (/jpe?g/.test(ext)) img = img.jpeg({ quality: 80, mozjpeg: true });
    else img = img.png({ compressionLevel: 9 });
    await img.toFile(file);
  }
  return out;
}

const sizesAttr = (src) => {
  const s = measured[src];
  if (!s) return '(max-width: 1023px) 100vw, 640px';
  const m = s.m >= 330 ? '100vw' : `${s.m}px`;
  return s.d ? `(max-width: 767px) ${m}, ${s.d}px` : m;
};

let changed = 0;
let variants = 0;
for (const d of fs.readdirSync(pagesDir)) {
  const bodyFile = path.join(pagesDir, d, 'body.html');
  if (!fs.existsSync(bodyFile)) continue;
  let html = fs.readFileSync(bodyFile, 'utf8');
  const tags = [...html.matchAll(/<img\b[^>]*>/g)];
  let out = '';
  let pos = 0;
  for (const m of tags) {
    let tag = m[0];
    const src = (tag.match(/\ssrc="(\/img\/[^"]+)"/) || [])[1];
    if (src && !/-\d+w\.[a-z]+$/.test(src) && fs.existsSync(path.join(pub, src))) {
      const { w, h } = await dims(src);
      if (!/\swidth="/.test(tag)) tag = tag.replace(/\ssrc=/, ` width="${w}" height="${h}" src=`);
      if (!/\ssrcset="/.test(tag)) {
        const list = WIDTHS.filter((x) => x < w - 40);
        if (list.length) {
          const parts = [];
          for (const x of list) { parts.push(`${await variant(src, x)} ${x}w`); variants++; }
          parts.push(`${src} ${w}w`);
          tag = tag.replace(/(\ssrc="[^"]+")/, `$1 srcset="${parts.join(', ')}" sizes="${sizesAttr(src)}"`);
        }
      }
    }
    out += html.slice(pos, m.index) + tag;
    pos = m.index + m[0].length;
  }
  out += html.slice(pos);
  if (out !== html) { fs.writeFileSync(bodyFile, out); changed++; }
}
console.log('páginas alteradas:', changed, '| variantes usadas:', variants);
