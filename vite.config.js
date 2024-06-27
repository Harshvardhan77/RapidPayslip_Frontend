import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api/v1/users': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['html2pdf.js'],
      output: {
        chunkFileNames: '[name].[hash].js',
        entryFileNames: '[name].[hash].js',
        format: 'es',
      },
    },
  },
});
