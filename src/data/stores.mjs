// Lojas de aplicativos (App Store e Google Play). DESLIGADO de propósito: os selos só aparecem no rodapé
// quando `live` for true E houver o endereço real do app na loja. Ligar = trocar `live` e `url` de UMA loja
// (ou das duas) depois que o app estiver PUBLICADO e instalável. Nunca ligar antes disso, nem com "em breve".
//
// Trava de build: se `live` for true com um endereço que não seja da loja certa, o build falha em vez de
// publicar um selo que leva a erro (ver `lojasAtivas`).
export const LOJAS = {
  googlePlay: {
    // LIGADO em 16/11/2026: versão 5 publicada no Brasil e página conferida (HTTP 200, nome do app). O selo é o oficial do Google
    // (public/img/selo-google-play-pt-br.png, baixado da página de marcas do Google, sem alteração).
    live: true,
    url: 'https://play.google.com/store/apps/details?id=com.aurorapremium.app',
    selo: { src: '/img/selo-google-play-pt-br.png', width: 646, height: 250 },
    label: 'Baixar o Aurora Premium no Google Play',
    texto: 'Google Play',
    prefixo: 'Disponível no',
  },
  appStore: {
    // DESLIGADO até a Apple aprovar e a versão estar PUBLICADA (enviada em 16/11/2026, em revisão). Endereço já preparado com o
    // número real do app (6835588984): quando a Apple liberar, ligar = trocar `live` para true (e conferir a página no ar).
    live: false,
    url: 'https://apps.apple.com/br/app/aurora-premium/id6835588984',
    label: 'Baixar o Aurora Premium na App Store',
    texto: 'App Store',
    prefixo: 'Baixar na',
  },
};

// Medição de instalações: o Google Play devolve o `referrer` no Play Console (Aquisição). Um link por LOCAL do site
// (rodape, cabecalho, menu) e por página mostra de onde veio cada instalação. A App Store não usa isso.
export function linkComMedicao(loja, local, pagina) {
  if (loja.chave !== 'googlePlay') return loja.url;
  const ref = `utm_source=aurorapremium.com&utm_medium=site&utm_campaign=${local}&utm_content=${pagina}`;
  return `${loja.url}&referrer=${encodeURIComponent(ref)}`;
}

/** Nome da página para a medição (ex.: /planos/ -> planos; home -> inicio). */
export function paginaParaMedicao(pathname) {
  return pathname.split('/').filter(Boolean).join('-') || 'inicio';
}

/** Rótulo curto para o cabeçalho: diz o sistema do celular, não a loja. */
export const ROTULO_CURTO = { googlePlay: 'App Android', appStore: 'App iPhone' };

const ORIGEM_VALIDA = {
  googlePlay: /^https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.aurorapremium\.app(&.*)?$/,
  appStore: /^https:\/\/apps\.apple\.com\/[a-z]{2}\/app\/[^/]+\/id\d+(\?.*)?$/,
};

/** Lojas que podem aparecer no site agora. Falha o build se uma loja ligada tiver endereço inválido. */
export function lojasAtivas() {
  const ativas = [];
  for (const [chave, loja] of Object.entries(LOJAS)) {
    if (!loja.live) continue;
    if (!ORIGEM_VALIDA[chave].test(loja.url)) {
      throw new Error(`stores.mjs: "${chave}" está ligada com um endereço inválido (${loja.url || 'vazio'}). Cole o endereço real do app publicado.`);
    }
    ativas.push({ chave, ...loja });
  }
  return ativas;
}
