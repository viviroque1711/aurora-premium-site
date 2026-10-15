// Prefixo do site: vazio em produção (domínio na raiz), "/aurora-premium-site" no endereço de teste do GitHub Pages.
const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
export const u = (path) => (path.startsWith('/') && !path.startsWith('//') ? base + path : path);
