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
				login: './src/pages/Login/index.html',
				signup: './src/pages/Signup/signup.html',
				404: './src/pages/404/404.html',
				505: './src/pages/505/505.html',
				profile: './src/pages/profile.html',
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
