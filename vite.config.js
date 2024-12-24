import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/front/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        clients: resolve(__dirname, 'clients.html'),
        programs: resolve(__dirname, 'programs.html'),
        terms: resolve(__dirname, 'terms.html'),
        vessel_list: resolve(__dirname, 'vessel_list.html'),
      },
    },
  },
});