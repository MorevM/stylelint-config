module.exports = {
	plugins: ['stylelint-at-rule-no-children'],
	rules: {
		'aditayvm/at-rule-no-children': [{
			ignore: ['if', 'each', 'at-root'],
		}],
	},
};
