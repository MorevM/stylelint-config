import { defineConfig } from 'tsdown/config';
import type { UserConfig } from 'tsdown/config';

const config: UserConfig = {
	clean: true,
	deps: {
		neverBundle: [
			'postcss-scss',
			'stylelint',
		],
	},
	dts: true,
	entry: {
		'configurations/css': './configurations/css/index.ts',
		'configurations/scss': './configurations/scss/index.ts',
	},
	fixedExtension: false,
	format: 'esm',
	hash: false,
	outDir: 'build',
	platform: 'node',
	target: 'node22',
};

export default defineConfig(config);
