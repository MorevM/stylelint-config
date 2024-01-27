export default {
	plugins: ['stylelint-use-nesting'],
	rules: {
		'csstools/use-nesting': ['always', {
			syntax: 'scss',
		}],
	},
};
