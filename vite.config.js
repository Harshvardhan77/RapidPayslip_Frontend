import { defineConfig } from 'vite';
import React from 'react';

export default defineConfig({
  server: {
    // proxy: {
    //   '/api/v1/users': {
    //     target: 'http://localhost:8000',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
