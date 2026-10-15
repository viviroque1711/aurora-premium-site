// Tira das páginas o cabeçalho, o rodapé e o botão do WhatsApp próprios (agora vêm da moldura única,
// src/components/Site*.astro) e prepara o HTML para a responsividade (rótulos de tabela, dica da grade).
// Não mexe em nenhum texto, título, FAQ ou JSON-LD do conteúdo.

/** Índice logo depois do fechamento do elemento que abre em openIdx (conta elementos aninhados da mesma tag). */
export function endOfElement(html, openIdx, tag) {
  const re = new RegExp(`<(/?)${tag}(?=[\\s>/])[^>]*>`, 'g');
  re.lastIndex = openIdx;
  let depth = 0;
  let m;
  while ((m = re.exec(html))) {
    if (m[1] === '/') depth--;
    else if (!m[0].endsWith('/>')) depth++;
    if (depth === 0) return m.index + m[0].length;
  }
  throw new Error('elemento sem fechamento: ' + tag);
}

/** Remove o primeiro elemento <tag ...> cujo tag de abertura casa com openRe. Devolve [html, removido|null]. */
export function removeElement(html, tag, openRe) {
  const re = new RegExp(`<${tag}(?=[\\s>/])[^>]*>`, 'g');
  let m;
  while ((m = re.exec(html))) {
    if (!openRe.test(m[0])) continue;
    const end = endOfElement(html, m.index, tag);
    // leva junto a quebra de linha e a indentação que sobrar
    let s = m.index;
    while (s > 0 && (html[s - 1] === ' ' || html[s - 1] === '\t')) s--;
    let e = end;
    if (html[e] === '\n') e++;
    return [html.slice(0, s) + html.slice(e), html.slice(m.index, end)];
  }
  return [html, null];
}

const txt = (s) => s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

/** Pacote novo: remove header.top e footer; devolve também os links de âncora da barra de seções. */
export function stripPackage(body) {
  let removedHeader;
  [body, removedHeader] = removeElement(body, 'header', /class="top"/);
  let subnav = null;
  if (removedHeader) {
    const nav = removedHeader.match(/<nav[^>]*aria-label="Seções da página"[^>]*>([\s\S]*?)<\/nav>/);
    subnav = nav
      ? [...nav[1].matchAll(/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)]
          .map((m) => ({ href: m[1].replace('https://aurorapremium.com', ''), label: txt(m[2]) }))
          // "Planos" já está no menu principal: só ficam âncoras da própria página
          .filter((l) => l.href.startsWith('#') || !l.href.startsWith('/'))
      : [];
  }
  [body] = removeElement(body, 'footer', /^<footer>$/);
  return { body, subnav };
}

/** Página antiga (React pré-renderizado): remove cabeçalho, rodapé e o botão flutuante do WhatsApp. */
export function stripLegacy(body) {
  [body] = removeElement(body, 'header', /class="sticky top-0/);
  [body] = removeElement(body, 'footer', /class="bg-\[var\(--bg-dark\)\] border-t/);
  [body] = removeElement(body, 'a', /aria-label="Entre em contato pelo WhatsApp"/);
  return body;
}

/** Cada célula ganha data-label com o título da coluna (usado pelo CSS que vira cartão no celular). */
export function labelTables(body) {
  return body.replace(/<table([^>]*)>([\s\S]*?)<\/table>/g, (all, attrs, inner) => {
    const isCmp = /class="cmp"/.test(attrs);
    const isCustom = /class="custom-table"/.test(attrs);
    if (!isCmp && !isCustom) return all;
    const heads = [...inner.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => txt(m[1]));
    if (isCmp && !(heads.length === 3 && /^No dia a dia/.test(heads[0]))) return all; // só o comparativo "caderno x Aurora"
    if (heads.length < 2) return all;
    const clean = inner.replace(/ data-label="[^"]*"/g, '');
    const out = clean.replace(/<tr>([\s\S]*?)<\/tr>/g, (row, cells) => {
      if (/<th/.test(cells)) return row;
      let i = 0;
      return '<tr>' + cells.replace(/<td([^>]*)>/g, (td, a) => {
        const k = i++;
        // comparativo: a 1ª coluna é a tarefa (em negrito, sem rótulo); as demais ganham o título da coluna
        return isCmp && k === 0 ? td : `<td${a} data-label="${heads[Math.min(k, heads.length - 1)].replace(/"/g, '&quot;')}">`;
      }) + '</tr>';
    });
    return `<table${attrs}>${out}</table>`;
  });
}

/** Tabela da política de privacidade: contêiner com rolagem horizontal de reserva. */
export function wrapCustomTables(body) {
  return body.replace(/(?<!<div class="tbl-scroll">)<table class="custom-table">([\s\S]*?)<\/table>/g, '<div class="tbl-scroll"><table class="custom-table">$1</table></div>');
}

/** Grade do dia: dica de rolagem (só no celular, por CSS) e contêiner para o degradê da borda direita. */
export function addGridHint(body) {
  if (body.includes('class="grid-fade"')) return body;
  const hasOwnHint = body.includes('class="swipe"') || body.includes('class="grid-hint"'); // pacotes novos já trazem a dica
  const open = '<div class="grid-scroll">';
  const i = body.indexOf(open);
  if (i < 0) return body;
  const end = endOfElement(body, i, 'div');
  return (
    body.slice(0, i) +
    (hasOwnHint ? '' : '<p class="grid-hint" aria-hidden="true">Arraste para ver toda a equipe →</p>\n      ') + '<div class="grid-fade">' +
    body.slice(i, end) +
    '</div>' +
    body.slice(end)
  );
}

export function frameTransform(body, kind) {
  if (kind === 'package') {
    const r = stripPackage(body);
    return { body: addGridHint(labelTables(r.body)), subnav: r.subnav };
  }
  return { body: wrapCustomTables(labelTables(stripLegacy(body))), subnav: null };
}
