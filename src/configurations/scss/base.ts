import postcssScss from 'postcss-scss';

const scssBaseConfig = {
	extends: ['@morev/stylelint-config/css'],
	customSyntax: postcssScss,
	rules: {
		'declaration-property-value-no-unknown': null,
		'media-query-no-invalid': null,
		'no-descending-specificity': null,
		'no-invalid-position-at-import-rule': null,
		'selector-no-invalid': null,
		'relative-selector-nesting-notation': null,
		// Valid Sass expressions such as calc(100% - $gap) are not valid CSS values before compilation.
		'value-no-invalid': null,
	},
};

export { scssBaseConfig };
