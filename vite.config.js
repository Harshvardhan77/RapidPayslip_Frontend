import { defineConfig } from 'vite';
import React from 'react';

export default defineConfig({
  server: {
    proxy: {
     '/api/v1/users': {
        target: 'https://rapidpayslipbackend-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
