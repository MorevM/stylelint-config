const parts = [
	'./plugins/scss.js',
	'./plugins/at-rule-no-children.js',
	'./plugins/use-nesting.js',
].map(part => require(part));

const base = {
	customSyntax: `require('postcss-scss')`,
};

module.exports = { parts, base };
