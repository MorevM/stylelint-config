import postcssScss from 'postcss-scss';

const scssBaseConfig = {
	extends: ['@morev/stylelint-config/css'],
	customSyntax: postcssScss,
	rules: {
		// CSS prelude grammars reject Sass mixin and function signatures.
		'at-rule-prelude-no-invalid': null,

		// Replaced by scss/declaration-property-value-no-unknown to handle Sass values and nested properties.
		'declaration-property-value-no-unknown': null,

		// Sass variables and interpolation are not valid CSS media query syntax.
		'media-query-no-invalid': null,

		// Source-order specificity checks cannot account for Sass mixin expansion.
		'no-descending-specificity': null,

		// Sass @import rules may follow @use and @forward.
		'no-invalid-position-at-import-rule': null,

		// CSS selector validation does not model Sass selector interpolation.
		'selector-no-invalid': null,

		// Allow both explicit and implicit relative nesting notation in Sass code.
		'relative-selector-nesting-notation': null,

		// Valid Sass expressions such as calc(100% - $gap) are not valid CSS values before compilation.
		'value-no-invalid': null,
	},
};

export { scssBaseConfig };
