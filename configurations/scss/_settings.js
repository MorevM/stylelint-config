const parts = [
	'./plugins/scss.js',
	'./plugins/at-rule-no-children.js',
	'./plugins/use-nesting.js',
].map(part => require(part));

const base = {
	customSyntax: `require('postcss-scss')`,
	rules: {
		'declaration-property-value-no-unknown': null,
		'media-query-no-invalid': null,
	},
};

module.exports = { parts, base };
