// // vite.config.js
// import { defineConfig } from 'vite';

// export default defineConfig({
//   root: '.', // Root where HTML files exist
//   publicDir: 'public',
//   build: {
//     outDir: 'dist'
//   }
// });


import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        resume: 'resume.html',
        contact: 'contact.html',
        projects: 'projects.html'
      }
    }
  }
});
