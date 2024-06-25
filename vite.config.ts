import 'dotenv/config';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    minify: true,
    target: 'modules',
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    babel({
      babelConfig: {
        plugins: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          {
            corejs: '3.26',
            useBuiltIns: 'usage',
          },
        ],
      },
    }),
  ],
});
