import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: ['**/node_modules/**', '**/e2e/**', '**/App.test.tsx', '**/tracing.ts'],
    css: true,
    testTimeout: 10000,
    hookTimeout: 10000,
    server: {
      deps: {
        inline: ['@opentelemetry/api'],
        exclude: ['@opentelemetry/sdk-trace-web', '@opentelemetry/exporter-trace-otlp-http'],
      },
    },
    env: {
      NODE_ENV: 'test',
    },
    alias: {
      './tracing': path.resolve(__dirname, './src/test/mock-tracing.ts'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
});
