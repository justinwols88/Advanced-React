import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    exclude: ['playwright-report']
  },
  server: {
    fs: {
      allow: ['.'],
      deny: ['**/playwright-report/**']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React and related libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separate Redux and state management
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          // Separate React Query
          'query-vendor': ['@tanstack/react-query'],
          // Separate Firebase
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          // Separate OpenTelemetry (large library)
          'telemetry-vendor': [
            '@opentelemetry/api',
            '@opentelemetry/sdk-trace-web',
            '@opentelemetry/exporter-trace-otlp-http',
            '@opentelemetry/instrumentation',
            '@opentelemetry/instrumentation-fetch',
            '@opentelemetry/instrumentation-xml-http-request',
            '@opentelemetry/resources',
            '@opentelemetry/semantic-conventions'
          ],
        },
      },
    },
    // Increase chunk size warning limit to 600kb (since we're splitting)
    chunkSizeWarningLimit: 600,
  },
})