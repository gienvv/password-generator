import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/password-generator/', // Required for GitHub Pages
  resolve: {
    alias: {
      zxcvbn: 'zxcvbn', // Ensure zxcvbn resolution
    },
  },
});