import { defineConfig } from '@morev/stylelint-config';

export default {
	overrides: [
		{ files: ['*.css'], ...defineConfig({ preset: 'css' }) },
		{ files: ['*.scss'], ...defineConfig({ preset: 'scss' }) },
	],
	rules: {},
};
