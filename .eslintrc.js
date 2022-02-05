module.exports = {
	root: true,
	extends: [
		'@morev/eslint-config/preset/common/warn-autofixable',
	],
	overrides: [
		{
			files: '*.js',
			rules: {
				'node/global-require': 'off',
				'import/no-dynamic-require': 'off',
			},
		},
	],
};
