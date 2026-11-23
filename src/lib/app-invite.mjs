// Convite do app dentro de cada página: logo abaixo do bloco de botões da primeira dobra (onde o visitante decide), com uma frase
// que dá o motivo e o selo oficial da loja, sem alteração. Só existe quando uma loja está ligada em src/data/stores.mjs.
// Não compete com o botão principal ("Teste o Aurora Premium"): é a terceira linha de ação, em texto simples + selo.
import { lojasAtivas, linkComMedicao, paginaParaMedicao } from '../data/stores.mjs';
import { u } from './url.mjs';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export function conviteApp(pathname) {
  const lojas = lojasAtivas().filter((l) => l.selo);
  if (lojas.length === 0) return '';
  const pagina = paginaParaMedicao(pathname);
  const frase = lojas.length > 1 ? 'Prefere testar pelo celular? Baixe o app e crie sua conta.' : 'Prefere testar pelo celular? Baixe o app Android e crie sua conta.';
  const selos = lojas
    .map(
      (l) =>
        `<a class="app-invite-selo" href="${esc(linkComMedicao(l, 'convite', pagina))}" rel="noopener" aria-label="${esc(l.label)}"><img src="${esc(u(l.selo.src))}" width="${l.selo.width}" height="${l.selo.height}" alt="${esc(l.label)}" loading="lazy" decoding="async"></a>`
    )
    .join('');
  return `<div class="app-invite"><p>${frase}</p>${selos}</div>`;
}

/** Insere o convite depois do primeiro bloco de botões (.cta) da página; se a página não tiver, não mexe em nada. */
export function comConviteApp(body, pathname) {
  const convite = conviteApp(pathname);
  if (!convite) return body;
  const re = /(<div class="cta"[^>]*>[\s\S]*?<\/a>\s*<\/div>)/;
  if (re.test(body)) return body.replace(re, `$1${convite}`);
  // Planos: a primeira dobra não tem botões; o convite entra no fim dela (a página é onde quem quer testar decide).
  if (/^\/planos\/?$/.test(pathname)) return body.replace(/(<\/div>\s*<\/section>)/, `${convite}$1`);
  return body;
}
