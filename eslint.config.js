import { combine, defineIgnores, defineConfiguration } from '@morev/eslint-config';

export default combine([
	defineIgnores(),
	defineConfiguration('javascript'),
	defineConfiguration('node'),
	defineConfiguration('json'),
	defineConfiguration('markdown'),
	defineConfiguration('yaml'),
	defineConfiguration('html'),
	defineConfiguration('vitest'),
]);
