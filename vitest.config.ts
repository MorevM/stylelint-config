import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const resolveAlias = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			'#constants': resolveAlias('./src/constants.ts'),
			'#index': resolveAlias('./src/index.ts'),
			'#shared': resolveAlias('./src/shared/index.ts'),
			'#utils': resolveAlias('./src/utils.ts'),
		},
	},
	test: {
		globals: true,
		watch: false,
	},
});
