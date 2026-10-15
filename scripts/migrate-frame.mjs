// Aplica uma vez (e pode reaplicar sem efeito) a moldura única às páginas já importadas:
// remove cabeçalho/rodapé próprios e guarda as âncoras da página em subnav.json.
import fs from 'node:fs';
import path from 'node:path';
import { frameTransform } from './lib/frame.mjs';

const dir = path.resolve(import.meta.dirname, '..', 'src', 'content-pages');
for (const d of fs.readdirSync(dir)) {
  const bodyFile = path.join(dir, d, 'body.html');
  if (!fs.existsSync(bodyFile)) continue;
  const kind = fs.existsSync(path.join(dir, d, 'style.css')) ? 'package' : 'legacy';
  const before = fs.readFileSync(bodyFile, 'utf8').replace(/\r\n/g, '\n');
  const r = frameTransform(before, kind);
  fs.writeFileSync(bodyFile, r.body);
  if (kind === 'package' && r.subnav) fs.writeFileSync(path.join(dir, d, 'subnav.json'), JSON.stringify(r.subnav, null, 1) + '\n');
  console.log(d.padEnd(46), kind.padEnd(8), before.length, '->', r.body.length, r.subnav ? 'subnav ' + r.subnav.length : '');
}
