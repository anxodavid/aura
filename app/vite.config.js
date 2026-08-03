import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages sirve las project pages en un subcamino (usuario.github.io/aura/).
  // Sin esto los activos se piden a la raíz y el sitio compilado carga en blanco.
  base: '/aura/',
  plugins: [preact()],
});
