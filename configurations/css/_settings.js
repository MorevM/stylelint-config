const parts = [
	'./rules/avoid-errors.js',
	'./rules/enforce-conventions.js',
	'./rules/stylistic-issues.js',

	'./plugins/declaration-block-no-ignored-properties.js',
	'./plugins/high-performance-animation.js',
	'./plugins/no-nested-media.js',
	'./plugins/order.js',
	'./plugins/selector-no-empty.js',
	'./plugins/selector-tag-no-without-class.js',
].map(part => require(part));

module.exports = { parts };
