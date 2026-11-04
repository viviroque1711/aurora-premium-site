// Lojas de aplicativos (App Store e Google Play). DESLIGADO de propósito: os selos só aparecem no rodapé
// quando `live` for true E houver o endereço real do app na loja. Ligar = trocar `live` e `url` de UMA loja
// (ou das duas) depois que o app estiver PUBLICADO e instalável. Nunca ligar antes disso, nem com "em breve".
//
// Trava de build: se `live` for true com um endereço que não seja da loja certa, o build falha em vez de
// publicar um selo que leva a erro (ver `lojasAtivas`).
export const LOJAS = {
  googlePlay: {
    live: false,
    url: '', // https://play.google.com/store/apps/details?id=com.aurorapremium.app
    label: 'Baixar o Aurora Premium no Google Play',
    texto: 'Google Play',
    prefixo: 'Disponível no',
  },
  appStore: {
    live: false,
    url: '', // https://apps.apple.com/br/app/<nome>/id<numero>
    label: 'Baixar o Aurora Premium na App Store',
    texto: 'App Store',
    prefixo: 'Baixar na',
  },
};

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
