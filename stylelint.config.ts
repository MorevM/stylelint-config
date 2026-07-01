import { defineConfig } from '@morev/stylelint-config';

export default defineConfig({
	targets: [
		{ files: ['*.css'], preset: 'css' },
		{ files: ['*.scss'], preset: 'scss' },
	],
});
