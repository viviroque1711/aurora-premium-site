// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aurorapremium.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
