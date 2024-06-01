/* eslint-disable sonarjs/no-duplicate-string */
export default {
	plugins: [
		'@stylistic/stylelint-plugin',
	],
	rules: {
		// #region Color

		// Specify lowercase or uppercase for hex colors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/color-hex-case/README.md
		'+@stylistic/color-hex-case': 'lower',

		// #endregion

		// #region Function

		// Require a newline or disallow whitespace after the commas of functions (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-comma-newline-after/README.md
		'+@stylistic/function-comma-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the commas of functions (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-comma-newline-before/README.md
		'+@stylistic/function-comma-newline-before': null,

		// Require a single space or disallow whitespace after the commas of functions (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-comma-space-after/README.md
		'+@stylistic/function-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of functions (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-comma-space-before/README.md
		'+@stylistic/function-comma-space-before': 'never',

		// Limit the number of adjacent empty lines within functions (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-max-empty-lines/README.md
		'+@stylistic/function-max-empty-lines': 0,

		// Require a newline or disallow whitespace on the inside of the parentheses of functions (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-parentheses-newline-inside/README.md
		'+@stylistic/function-parentheses-newline-inside': 'always-multi-line',

		// Require a single space or disallow whitespace on the inside of the parentheses of functions (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-parentheses-space-inside/README.md
		'+@stylistic/function-parentheses-space-inside': 'never-single-line',

		// Require or disallow whitespace after functions (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-whitespace-after/README.md
		'+@stylistic/function-whitespace-after': 'always',

		// #endregion

		// #region Number

		// Require or disallow a leading zero for fractional numbers less than 1 (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/number-leading-zero/README.md
		'+@stylistic/number-leading-zero': 'never',

		// Disallow trailing zeros in numbers (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/number-no-trailing-zeros/README.md
		'+@stylistic/number-no-trailing-zeros': true,

		// #endregion

		// #region String

		// Specify single or double quotes around strings (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/string-quotes/README.md
		'+@stylistic/string-quotes': 'single',

		// #endregion

		// #region Unit

		// Specify lowercase or uppercase for units (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/unit-case/README.md
		'+@stylistic/unit-case': 'lower',

		// #endregion

		// #region Value list

		// Require a newline or disallow whitespace after the commas of value lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-comma-newline-after/README.md
		'+@stylistic/value-list-comma-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the commas of value lists
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-comma-newline-before/README.md
		'@stylistic/value-list-comma-newline-before': 'never-multi-line',

		// Require a single space or disallow whitespace after the commas of value lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-comma-space-after/README.md
		'+@stylistic/value-list-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of value lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-comma-space-before/README.md
		'+@stylistic/value-list-comma-space-before': 'never',

		// Limit the number of adjacent empty lines within value lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-max-empty-lines/README.md
		'+@stylistic/value-list-max-empty-lines': 0,

		// #endregion

		// #region Property

		// Specify lowercase or uppercase for properties (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/property-case/README.md
		'+@stylistic/property-case': 'lower',

		// #endregion

		// #region Declaration

		// Require a single space or disallow whitespace after the bang of declarations (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-bang-space-after/README.md
		'+@stylistic/declaration-bang-space-after': 'never',

		// Require a single space or disallow whitespace before the bang of declarations (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-bang-space-before/README.md
		'+@stylistic/declaration-bang-space-before': 'always',

		// Require a newline or disallow whitespace after the colon of declarations (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-colon-newline-after/README.md
		'+@stylistic/declaration-colon-newline-after': 'always-multi-line',

		// Require a single space or disallow whitespace after the colon of declarations (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-colon-space-after/README.md
		'+@stylistic/declaration-colon-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the colon of declarations (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-colon-space-before/README.md
		'+@stylistic/declaration-colon-space-before': 'never',

		// #endregion

		// #region Declaration block

		// Require a newline or disallow whitespace after the semicolons of declaration blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-newline-after/README.md
		'+@stylistic/declaration-block-semicolon-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the semicolons of declaration blocks
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-newline-before/README.md
		'@stylistic/declaration-block-semicolon-newline-before': 'never-multi-line',

		// Require a single space or disallow whitespace after the semicolons of declaration blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-space-after/README.md
		'+@stylistic/declaration-block-semicolon-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the semicolons of declaration blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-space-before/README.md
		'+@stylistic/declaration-block-semicolon-space-before': 'never',

		// Require or disallow a trailing semicolon within declaration blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-trailing-semicolon/README.md
		'+@stylistic/declaration-block-trailing-semicolon': 'always',

		// #endregion

		// #region Block

		// Require or disallow an empty line before the closing brace of blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-empty-line-before/README.md
		'+@stylistic/block-closing-brace-empty-line-before': 'never',

		// Require a newline or disallow whitespace after the closing brace of blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-newline-after/README.md
		'+@stylistic/block-closing-brace-newline-after': ['always', {
			ignoreAtRules: ['if', 'else'], // No effect for CSS, but good for extending with SCSS
		}],

		//  Require a newline or disallow whitespace before the closing brace of blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-newline-before/README.md
		'+@stylistic/block-closing-brace-newline-before': 'always-multi-line',

		// Require a single space or disallow whitespace after the closing brace of blocks
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-space-after/README.md
		'@stylistic/block-closing-brace-space-after': null,

		// Require a single space or disallow whitespace before the closing brace of blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-space-before/README.md
		'+@stylistic/block-closing-brace-space-before': 'always-single-line',

		// Require a newline after the opening brace of blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-opening-brace-newline-after/README.md
		'+@stylistic/block-opening-brace-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the opening brace of blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-opening-brace-newline-before/README.md
		'+@stylistic/block-opening-brace-newline-before': null,

		// Require a single space or disallow whitespace after the opening brace of blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-opening-brace-space-after/README.md
		'+@stylistic/block-opening-brace-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the opening brace of blocks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-opening-brace-space-before/README.md
		'+@stylistic/block-opening-brace-space-before': 'always',

		// #endregion

		// #region Selector

		// Require a single space or disallow whitespace on the inside of the brackets within attribute selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-attribute-brackets-space-inside/README.md
		'+@stylistic/selector-attribute-brackets-space-inside': 'never',

		// Require a single space or disallow whitespace after operators within attribute selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-attribute-operator-space-after/README.md
		'+@stylistic/selector-attribute-operator-space-after': 'never',

		// Require a single space or disallow whitespace before operators within attribute selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-attribute-operator-space-before/README.md
		'+@stylistic/selector-attribute-operator-space-before': 'never',

		// Require a single space or disallow whitespace after the combinators of selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-combinator-space-after/README.md
		'+@stylistic/selector-combinator-space-after': 'always',

		// Require a single space or disallow whitespace before the combinators of selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-combinator-space-before/README.md
		'+@stylistic/selector-combinator-space-before': 'always',

		// Disallow non-space characters for descendant combinators of selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-descendant-combinator-no-non-space/README.md
		'+@stylistic/selector-descendant-combinator-no-non-space': true,

		//  Limit the number of adjacent empty lines within selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-max-empty-lines/README.md
		'+@stylistic/selector-max-empty-lines': 0,

		// Specify lowercase or uppercase for pseudo-class selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-pseudo-class-case/README.md
		'+@stylistic/selector-pseudo-class-case': 'lower',

		// Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-pseudo-class-parentheses-space-inside/README.md
		'+@stylistic/selector-pseudo-class-parentheses-space-inside': 'never',

		// Specify lowercase or uppercase for pseudo-element selectors (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-pseudo-element-case/README.md
		'+@stylistic/selector-pseudo-element-case': 'lower',

		// #endregion

		// #region Selector list

		// Require a newline or disallow whitespace after the commas of selector lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-list-comma-newline-after/README.md
		// Note: sometimes it's good to group similar selectors line by line
		'+@stylistic/selector-list-comma-newline-after': null,

		// Require a newline or disallow whitespace before the commas of selector lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-list-comma-newline-before/README.md
		'+@stylistic/selector-list-comma-newline-before': 'never-multi-line',

		// Require a single space or disallow whitespace after the commas of selector lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-list-comma-space-after/README.md
		'+@stylistic/selector-list-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of selector lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-list-comma-space-before/README.md
		'+@stylistic/selector-list-comma-space-before': 'never',

		// #endregion

		// #region Media feature

		// Require a single space or disallow whitespace after the colon in media features (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-colon-space-after/README.md
		'+@stylistic/media-feature-colon-space-after': 'always',

		// Require a single space or disallow whitespace before the colon in media features (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-colon-space-before/README.md
		'+@stylistic/media-feature-colon-space-before': 'never',

		// Specify lowercase or uppercase for media feature names (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-name-case/README.md
		'+@stylistic/media-feature-name-case': 'lower',

		// Require a single space or disallow whitespace on the inside of the parentheses within media features (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-parentheses-space-inside/README.md
		'+@stylistic/media-feature-parentheses-space-inside': 'never',

		// Require a single space or disallow whitespace after the range operator in media features (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-range-operator-space-after/README.md
		'+@stylistic/media-feature-range-operator-space-after': 'always',

		// Require a single space or disallow whitespace before the range operator in media features (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-range-operator-space-before/README.md
		'+@stylistic/media-feature-range-operator-space-before': 'always',

		// #endregion

		// #region Media query list

		// Require a newline or disallow whitespace after the commas of media query lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-query-list-comma-newline-after/README.md
		'+@stylistic/media-query-list-comma-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the commas of media query lists
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-query-list-comma-newline-before/README.md
		'@stylistic/media-query-list-comma-newline-before': 'never-multi-line',

		// Require a single space or disallow whitespace after the commas of media query lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-query-list-comma-space-after/README.md
		'+@stylistic/media-query-list-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of media query lists (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-query-list-comma-space-before/README.md
		'+@stylistic/media-query-list-comma-space-before': 'never',

		// #endregion

		// #region At-rule

		// Specify lowercase or uppercase for at-rules names (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-name-case/README.md
		'+@stylistic/at-rule-name-case': 'lower',

		// Require a newline after at-rule names
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-name-newline-after/README.md
		'@stylistic/at-rule-name-newline-after': null,

		// Require a single space after at-rule names (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-name-space-after/README.md
		'+@stylistic/at-rule-name-space-after': 'always-single-line',

		// Require a newline after the semicolon of at-rules (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-semicolon-newline-after/README.md
		'+@stylistic/at-rule-semicolon-newline-after': 'always',

		// Require a single space or disallow whitespace before the semicolons of at-rules
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-semicolon-space-before/README.md
		'@stylistic/at-rule-semicolon-space-before': 'never',

		// #endregion

		// #region Named grid areas

		// Require cell tokens (and optionally ending quotes) within grid-template-areas to be aligned (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/named-grid-areas-alignment/README.md
		// Ma rule :)
		'+@stylistic/named-grid-areas-alignment': [true, { gap: 2, alignQuotes: true }],

		// #endregion

		// #region General / Sheet

		// Specify indentation (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/indentation/README.md
		'+@stylistic/indentation': 'tab',

		// Specify unix or windows linebreaks (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/linebreaks/README.md
		'+@stylistic/linebreaks': 'unix',

		// Limit the number of adjacent empty lines (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/max-empty-lines/README.md
		'+@stylistic/max-empty-lines': 1,

		// Limit the length of a line
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/max-line-length/README.md
		'@stylistic/max-line-length': 120,

		// Disallow empty first lines (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/no-empty-first-line/README.md
		'+@stylistic/no-empty-first-line': true,

		// Disallow end-of-line whitespace (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/no-eol-whitespace/README.md
		'+@stylistic/no-eol-whitespace': true,

		// Disallow extra semicolons (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/no-extra-semicolons/README.md
		'+@stylistic/no-extra-semicolons': true,

		// Disallow missing end-of-source newlines (autofixable)
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/no-missing-end-of-source-newline/README.md
		'+@stylistic/no-missing-end-of-source-newline': true,

		// Require or disallow Unicode BOM
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/unicode-bom/README.md
		'@stylistic/unicode-bom': 'never',

		// #endregion
	},
};
