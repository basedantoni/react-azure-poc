import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Change output directory to 'build' for deployment pipeline compatibility
    outDir: 'build',
    // Enable source maps for better debugging (optional)
    sourcemap: false,
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Let pdf-lib be dynamically imported instead of bundled
          if (id.includes('pdf-lib')) {
            return; // Don't bundle, let it be code-split
          }

          // React core
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }

          // Router and query
          if (id.includes('@tanstack/react-router')) {
            return 'router-vendor';
          }
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }

          // UI components - split into smaller chunks
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui-vendor';
          }

          // Form handling
          if (
            id.includes('react-hook-form') ||
            id.includes('@hookform/resolvers') ||
            id.includes('zod')
          ) {
            return 'form-vendor';
          }

          // Signature canvas - separate chunk since it's only used in one component
          if (id.includes('react-signature-canvas')) {
            return 'signature-vendor';
          }

          // Data table
          if (id.includes('@tanstack/react-table')) {
            return 'table-vendor';
          }

          // Utilities and CSV export
          if (id.includes('export-to-csv') || id.includes('date-fns')) {
            return 'utils-vendor';
          }

          // Styling and theming
          if (
            id.includes('tailwind-merge') ||
            id.includes('class-variance-authority') ||
            id.includes('clsx') ||
            id.includes('next-themes') ||
            id.includes('tw-animate-css')
          ) {
            return 'style-vendor';
          }

          // i18n
          if (id.includes('react-i18next') || id.includes('i18next')) {
            return 'i18n-vendor';
          }

          // Node modules - catch all for remaining vendor code
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Enable minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // Remove specific console methods
      },
      mangle: {
        safari10: true, // Fix Safari 10/11 bugs
      },
    },
    // Additional optimizations
    target: 'es2020',
    cssCodeSplit: true,
  },
});
