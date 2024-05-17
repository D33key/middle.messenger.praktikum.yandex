import { defineConfig } from 'vite';
import path, { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    minify: true,
    target: 'modules',
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'src/pages/Login/login.html'),
        signup: resolve(__dirname, 'src/pages/Signup/signup.html'),
        notFound: resolve(__dirname, 'src/pages/404/404.html'),
        serverError: resolve(__dirname, 'src/pages/505/505.html'),
        profile: resolve(__dirname, 'src/pages/Profile/profile.html'),
        chat: resolve(__dirname, 'src/pages/Chat/chat.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name].[ext]',
        manualChunks: undefined,
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
