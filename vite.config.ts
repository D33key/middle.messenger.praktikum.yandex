import path, { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    minify: true,
    target: 'modules',
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'src/login.html'),
        signup: resolve(__dirname, 'src/signup.html'),
        notFound: resolve(__dirname, 'src/404.html'),
        serverError: resolve(__dirname, 'src/505.html'),
        profile: resolve(__dirname, 'src/profile.html'),
        chat: resolve(__dirname, 'src/chat.html'),
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
});
