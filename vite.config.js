// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Root where HTML files exist
  publicDir: 'public',
  build: {
    outDir: 'dist'
  }
});
