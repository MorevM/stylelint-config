/** @type {import('stylelint').Config} */
export default {
	overrides: [
		{ files: '*.css', extends: ['./build/configurations/css.js'] },
		{ files: '*.scss', extends: ['./build/configurations/scss.js'] },
	],
};
