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
    // Enable source maps for better debugging (optional)
    sourcemap: false,
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks: {
          // React and core dependencies
          'react-vendor': ['react', 'react-dom'],

          // Router and query
          'router-vendor': ['@tanstack/react-router', '@tanstack/react-query'],

          // UI components (Radix + Shadcn)
          'ui-vendor': [
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-aspect-ratio',
            'lucide-react',
          ],

          // PDF handling (heavy library)
          'pdf-vendor': ['pdf-lib'],

          // Form handling
          'form-vendor': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod',
            'react-signature-canvas',
          ],

          // Data table and utilities
          'table-vendor': [
            '@tanstack/react-table',
            'export-to-csv',
            'date-fns',
          ],

          // Styling and theming
          'style-vendor': [
            'tailwind-merge',
            'class-variance-authority',
            'clsx',
            'next-themes',
            'tw-animate-css',
          ],

          // Dev tools (should be excluded in production)
          ...(process.env.NODE_ENV === 'development'
            ? {
                'dev-tools': [
                  '@tanstack/react-query-devtools',
                  '@tanstack/react-router-devtools',
                ],
              }
            : {}),
        },
      },
    },
    // Enable minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
  },
});
