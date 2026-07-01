import { defineConfig } from 'tsdown/config';

export default defineConfig({
	clean: true,
	deps: {
		neverBundle: [
			'postcss-scss',
			'stylelint',
		],
	},
	dts: true,
	entry: {
		'index': './src/index.ts',
		'configurations/css': './src/configurations/css/index.ts',
		'configurations/scss': './src/configurations/scss/index.ts',
	},
	fixedExtension: false,
	format: 'esm',
	hash: false,
	platform: 'node',
	target: 'node22',
});
