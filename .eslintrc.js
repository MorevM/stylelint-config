module.exports = {
	root: true,
	extends: [
		'@morev/eslint-config/preset/common',
	],
	overrides: [
		{
			files: '*.js',
			rules: {
				'import/no-dynamic-require': 'off',
			},
		},
	],
};
