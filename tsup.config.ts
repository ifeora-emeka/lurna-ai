import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs'],
  outDir: 'dist',
  watch: process.env.NODE_ENV !== 'production',
  onSuccess: process.env.NODE_ENV !== 'production' ? 'node dist/server.js' : undefined,
});
