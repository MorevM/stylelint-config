/* eslint-disable sonarjs/no-duplicate-string */
module.exports = {
	rules: {
		// #region Color

		// Specify lowercase or uppercase for hex colors (autofixable)
		// https://stylelint.io/user-guide/rules/list/color-hex-case/
		'+color-hex-case': 'lower',

		// #endregion

		// #region Function

		// Require a newline or disallow whitespace after the commas of functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-comma-newline-after/
		'+function-comma-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the commas of functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-comma-newline-before/
		'+function-comma-newline-before': null,

		// Require a single space or disallow whitespace after the commas of functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-comma-space-after
		'+function-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-comma-space-before/
		'+function-comma-space-before': 'never',

		// Limit the number of adjacent empty lines within functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-max-empty-lines/
		'+function-max-empty-lines': 0,

		// Require a newline or disallow whitespace on the inside of the parentheses of functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-parentheses-newline-inside/
		'+function-parentheses-newline-inside': 'always-multi-line',

		// Require a single space or disallow whitespace on the inside of the parentheses of functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-parentheses-space-inside/
		'+function-parentheses-space-inside': 'never-single-line',

		// Require or disallow whitespace after functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-whitespace-after/
		'+function-whitespace-after': 'always',

		// #endregion

		// #region Number

		// Require or disallow a leading zero for fractional numbers less than 1 (autofixable)
		// https://stylelint.io/user-guide/rules/list/number-leading-zero/
		'+number-leading-zero': 'never',

		// Disallow trailing zeros in numbers (autofixable)
		// https://stylelint.io/user-guide/rules/list/number-no-trailing-zeros/
		'+number-no-trailing-zeros': true,

		// #endregion

		// #region String

		// Specify single or double quotes around strings (autofixable)
		// https://stylelint.io/user-guide/rules/list/string-quotes/
		'+string-quotes': 'single',

		// #endregion

		// #region Unit

		// Specify lowercase or uppercase for units (autofixable)
		// https://stylelint.io/user-guide/rules/list/unit-case/
		'+unit-case': 'lower',

		// #endregion

		// #region Value list

		// Require a newline or disallow whitespace after the commas of value lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/value-list-comma-newline-after/
		'+value-list-comma-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the commas of value lists
		// https://stylelint.io/user-guide/rules/list/value-list-comma-newline-before/
		'value-list-comma-newline-before': 'never-multi-line',

		// Require a single space or disallow whitespace after the commas of value lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/value-list-comma-space-after/
		'+value-list-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of value lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/value-list-comma-space-before/
		'+value-list-comma-space-before': 'never',

		// Limit the number of adjacent empty lines within value lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/value-list-max-empty-lines/
		'+value-list-max-empty-lines': 0,

		// #endregion

		// #region Property

		// Specify lowercase or uppercase for properties (autofixable)
		// https://stylelint.io/user-guide/rules/list/property-case/
		'+property-case': 'lower',

		// #endregion

		// #region Declaration

		// Require a single space or disallow whitespace after the bang of declarations (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-bang-space-after/
		'+declaration-bang-space-after': 'never',

		// Require a single space or disallow whitespace before the bang of declarations (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-bang-space-before/
		'+declaration-bang-space-before': 'always',

		// Require a newline or disallow whitespace after the colon of declarations (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-colon-newline-after/
		'+declaration-colon-newline-after': 'always-multi-line',

		// Require a single space or disallow whitespace after the colon of declarations (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-colon-space-after/
		'+declaration-colon-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the colon of declarations (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-colon-space-before/
		'+declaration-colon-space-before': 'never',

		// #endregion

		// #region Declaration block

		// Require a newline or disallow whitespace after the semicolons of declaration blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-block-semicolon-newline-after/
		'+declaration-block-semicolon-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the semicolons of declaration blocks
		// https://stylelint.io/user-guide/rules/list/declaration-block-semicolon-newline-before/
		'declaration-block-semicolon-newline-before': 'never-multi-line',

		// Require a single space or disallow whitespace after the semicolons of declaration blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-block-semicolon-space-after/
		'+declaration-block-semicolon-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the semicolons of declaration blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-block-semicolon-space-before/
		'+declaration-block-semicolon-space-before': 'never',

		// Require or disallow a trailing semicolon within declaration blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-block-trailing-semicolon/
		'+declaration-block-trailing-semicolon': 'always',

		// #endregion

		// #region Block

		// Require or disallow an empty line before the closing brace of blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/block-closing-brace-empty-line-before/
		'+block-closing-brace-empty-line-before': 'never',

		// Require a newline or disallow whitespace after the closing brace of blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/block-closing-brace-newline-after/
		'+block-closing-brace-newline-after': ['always', {
			ignoreAtRules: ['if', 'else'], // No effect for CSS, but good for extending with SCSS
		}],

		//  Require a newline or disallow whitespace before the closing brace of blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/block-closing-brace-newline-before/
		'+block-closing-brace-newline-before': 'always-multi-line',

		// Require a single space or disallow whitespace after the closing brace of blocks
		// https://stylelint.io/user-guide/rules/list/block-closing-brace-space-after/
		'block-closing-brace-space-after': null,

		// Require a single space or disallow whitespace before the closing brace of blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/block-closing-brace-space-before/
		'+block-closing-brace-space-before': 'always-single-line',

		// Require a newline after the opening brace of blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/block-opening-brace-newline-after/
		'+block-opening-brace-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the opening brace of blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/block-opening-brace-newline-before/
		'+block-opening-brace-newline-before': null,

		// Require a single space or disallow whitespace after the opening brace of blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/block-opening-brace-space-after/
		'+block-opening-brace-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the opening brace of blocks (autofixable)
		// https://stylelint.io/user-guide/rules/list/block-opening-brace-space-before/
		'+block-opening-brace-space-before': 'always',

		// #endregion

		// #region Selector

		// Require a single space or disallow whitespace on the inside of the brackets within attribute selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-attribute-brackets-space-inside/
		'+selector-attribute-brackets-space-inside': 'never',

		// Require a single space or disallow whitespace after operators within attribute selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-attribute-operator-space-after/
		'+selector-attribute-operator-space-after': 'never',

		// Require a single space or disallow whitespace before operators within attribute selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-attribute-operator-space-before/
		'+selector-attribute-operator-space-before': 'never',

		// Require a single space or disallow whitespace after the combinators of selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-combinator-space-after/
		'+selector-combinator-space-after': 'always',

		// Require a single space or disallow whitespace before the combinators of selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-combinator-space-before/
		'+selector-combinator-space-before': 'always',

		// Disallow non-space characters for descendant combinators of selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-descendant-combinator-no-non-space/
		'+selector-descendant-combinator-no-non-space': true,

		//  Limit the number of adjacent empty lines within selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-max-empty-lines/
		'+selector-max-empty-lines': 0,

		// Specify lowercase or uppercase for pseudo-class selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-class-case/
		'+selector-pseudo-class-case': 'lower',

		// Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-class-parentheses-space-inside/
		'+selector-pseudo-class-parentheses-space-inside': 'never',

		// Specify lowercase or uppercase for pseudo-element selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-element-case/
		'+selector-pseudo-element-case': 'lower',

		// #endregion

		// #region Selector list

		// Require a newline or disallow whitespace after the commas of selector lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-list-comma-newline-after/
		// Note: sometimes it's good to group similar selectors line by line
		'+selector-list-comma-newline-after': null,

		// Require a newline or disallow whitespace before the commas of selector lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-list-comma-newline-before/
		'+selector-list-comma-newline-before': 'never-multi-line',

		// Require a single space or disallow whitespace after the commas of selector lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-list-comma-space-after/
		'+selector-list-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of selector lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-list-comma-space-before/
		'+selector-list-comma-space-before': 'never',

		// #endregion

		// #region Media feature

		// Require a single space or disallow whitespace after the colon in media features (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-feature-colon-space-after/
		'+media-feature-colon-space-after': 'always',

		// Require a single space or disallow whitespace before the colon in media features (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-feature-colon-space-before/
		'+media-feature-colon-space-before': 'never',

		// Specify lowercase or uppercase for media feature names (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-feature-name-case/
		'+media-feature-name-case': 'lower',

		// Require a single space or disallow whitespace on the inside of the parentheses within media features (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-feature-parentheses-space-inside/
		'+media-feature-parentheses-space-inside': 'never',

		// Require a single space or disallow whitespace after the range operator in media features (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-feature-range-operator-space-after/
		'+media-feature-range-operator-space-after': 'always',

		// Require a single space or disallow whitespace before the range operator in media features (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-feature-range-operator-space-before/
		'+media-feature-range-operator-space-before': 'always',

		// #endregion

		// #region Media query list

		// Require a newline or disallow whitespace after the commas of media query lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-query-list-comma-newline-after/
		'+media-query-list-comma-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace before the commas of media query lists
		// https://stylelint.io/user-guide/rules/list/media-query-list-comma-newline-before/
		'media-query-list-comma-newline-before': 'never-multi-line',

		// Require a single space or disallow whitespace after the commas of media query lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-query-list-comma-space-after/
		'+media-query-list-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of media query lists (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-query-list-comma-space-before/
		'+media-query-list-comma-space-before': 'never',

		// #endregion

		// #region At-rule

		// Specify lowercase or uppercase for at-rules names (autofixable)
		// https://stylelint.io/user-guide/rules/list/at-rule-name-case/
		'+at-rule-name-case': 'lower',

		// Require a newline after at-rule names
		// https://stylelint.io/user-guide/rules/list/at-rule-name-newline-after/
		'at-rule-name-newline-after': null,

		// Require a single space after at-rule names (autofixable)
		// https://stylelint.io/user-guide/rules/list/at-rule-name-space-after/
		'+at-rule-name-space-after': 'always-single-line',

		// Require a newline after the semicolon of at-rules (autofixable)
		// https://stylelint.io/user-guide/rules/list/at-rule-semicolon-newline-after/
		'+at-rule-semicolon-newline-after': 'always',

		// Require a single space or disallow whitespace before the semicolons of at-rules
		// https://stylelint.io/user-guide/rules/list/at-rule-semicolon-space-before/
		'at-rule-semicolon-space-before': 'never',

		// #endregion

		// #region General / Sheet

		// Specify indentation (autofixable)
		// https://stylelint.io/user-guide/rules/list/indentation/
		'+indentation': 'tab',

		// Specify unix or windows linebreaks (autofixable)
		// https://stylelint.io/user-guide/rules/list/linebreaks/
		'+linebreaks': 'unix',

		// Limit the number of adjacent empty lines (autofixable)
		// https://stylelint.io/user-guide/rules/list/max-empty-lines/
		'+max-empty-lines': 1,

		// Limit the length of a line
		// https://stylelint.io/user-guide/rules/list/max-line-length/
		'max-line-length': 120,

		// Disallow empty first lines (autofixable)
		// https://stylelint.io/user-guide/rules/list/no-empty-first-line/
		'+no-empty-first-line': true,

		// Disallow end-of-line whitespace (autofixable)
		// https://stylelint.io/user-guide/rules/list/no-eol-whitespace/
		'+no-eol-whitespace': true,

		// Disallow extra semicolons (autofixable)
		// https://stylelint.io/user-guide/rules/list/no-extra-semicolons/
		'+no-extra-semicolons': true,

		// Disallow missing end-of-source newlines (autofixable)
		// https://stylelint.io/user-guide/rules/list/no-missing-end-of-source-newline/
		'+no-missing-end-of-source-newline': true,

		// Require or disallow Unicode BOM
		// https://stylelint.io/user-guide/rules/list/unicode-bom/
		'unicode-bom': 'never',

		// #endregion
	},
};
