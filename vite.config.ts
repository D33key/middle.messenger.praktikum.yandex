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
				main: './src/pages/index.html',
				signUp: './src/pages/signup.html',
				notFound: './src/pages/not-found.html',
				505: './src/pages/505.html',
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
