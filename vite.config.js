import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Root is current dir — correct
  publicDir: 'public', // HTML and static assets
  server: {
    port: 5173, // Optional; default is 5173
    open: '/index.html' // Auto opens homepage
  }
});
