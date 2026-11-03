import { combine, defineConfiguration, defineIgnores } from '@morev/eslint-config';

export default combine([
	defineIgnores({ extraIgnoredGlobs: ['fixtures/consumer/**'] }),
	defineConfiguration('javascript'),
	defineConfiguration('typescript'),
	defineConfiguration('node'),
	defineConfiguration('json'),
	defineConfiguration('markdown'),
	defineConfiguration('yaml'),
	defineConfiguration('html'),
	defineConfiguration('vitest'),
	{
		files: ['**/*.ts'],
		rules: {
			'n/file-extension-in-import': 'off',
		},
	},
]);
