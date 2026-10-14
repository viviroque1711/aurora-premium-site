// @ts-check
import { defineConfig } from 'astro/config';

// Rotas antigas da Horizons que redirecionavam por JavaScript (agora viram páginas de redirecionamento).
const staging = process.env.SITE_ENV === 'staging';
const B = staging ? '/aurora-premium-site' : '';
const redirects = {
  '/agenda-para-clinica-veterinaria/': B + '/sistema-para-clinica-veterinaria/',
  '/segmentos/veterinarias/': B + '/sistema-para-clinica-veterinaria/',
  '/segmentos/clinicas/': B + '/agenda-para-consultorio-medico/',
  '/segmentos/saloes/': B + '/sistema-para-salao-de-beleza/',
  '/segmentos/spas/': B + '/sistema-para-spa/',
  '/segmentos/barbearias/': B + '/sistema-para-barbearia/',
  '/segmentos/petshops/': B + '/sistema-para-pet-shop/',
};

export default defineConfig({
  site: 'https://aurorapremium.com',
  // Teste no GitHub Pages fica em /aurora-premium-site/; na produção o site está na raiz do domínio.
  base: staging ? '/aurora-premium-site' : '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  redirects,
});
