module.exports = {
	rules: {
		// Disallow invalid hex colors
		// https://stylelint.io/user-guide/rules/list/color-no-invalid-hex/
		'color-no-invalid-hex': true,

		// Disallow duplicate font family names
		// https://stylelint.io/user-guide/rules/list/font-family-no-duplicate-names/
		'font-family-no-duplicate-names': [true, {
			ignoreFontFamilyNames: ['monospace'],
		}],

		// Disallow missing generic families in lists
		// https://stylelint.io/user-guide/rules/list/font-family-no-missing-generic-family-keyword/
		'font-family-no-missing-generic-family-keyword': true,

		// Disallow invalid named grid areas
		// https://stylelint.io/user-guide/rules/list/named-grid-areas-no-invalid/
		'named-grid-areas-no-invalid': true,

		// Disallow an unspaced operator within calc functions
		// https://stylelint.io/user-guide/rules/list/function-calc-no-unspaced-operator/
		'function-calc-no-unspaced-operator': true,

		// Disallow direction values in `linear-gradient()` calls that are not valid according to the standard syntax
		// https://stylelint.io/user-guide/rules/list/function-linear-gradient-no-nonstandard-direction/
		'function-linear-gradient-no-nonstandard-direction': true,

		// Disallow (unescaped) newlines in strings
		// https://stylelint.io/user-guide/rules/list/string-no-newline/
		'string-no-newline': true,

		// Disallow unknown units
		// https://stylelint.io/user-guide/rules/list/unit-no-unknown/
		'unit-no-unknown': true,

		// Disallow missing `var` function for custom properties
		// https://stylelint.io/user-guide/rules/list/custom-property-no-missing-var-function/
		'custom-property-no-missing-var-function': true,

		// Disallow unknown properties
		// https://stylelint.io/user-guide/rules/list/property-no-unknown/
		'property-no-unknown': [true, {
			ignoreProperties: ['/^lost-/'], // PostCSS Lost Grid
		}],

		// Disallow `!important` within keyframe declarations
		// https://stylelint.io/user-guide/rules/list/keyframe-declaration-no-important/
		'keyframe-declaration-no-important': true,

		// Disallow duplicate custom properties within declaration blocks
		// https://stylelint.io/user-guide/rules/list/declaration-block-no-duplicate-custom-properties/
		'declaration-block-no-duplicate-custom-properties': true,

		// Disallow duplicate properties within declaration blocks
		// https://stylelint.io/user-guide/rules/list/declaration-block-no-duplicate-properties/
		'declaration-block-no-duplicate-properties': [true, {
			ignore: ['consecutive-duplicates-with-different-values'],
		}],

		// Disallow shorthand properties that override related longhand properties
		// https://stylelint.io/user-guide/rules/list/declaration-block-no-shorthand-property-overrides/
		'declaration-block-no-shorthand-property-overrides': true,

		// Disallow empty blocks
		// https://stylelint.io/user-guide/rules/list/block-no-empty/
		// Note: it's good sometimes to show nesting or pseudo-nesting (BEM) depth
		'block-no-empty': null,

		// Disallow unknown pseudo-class selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-class-no-unknown/
		'selector-pseudo-class-no-unknown': true,

		// Disallow unknown pseudo-element selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-element-no-unknown/
		'selector-pseudo-element-no-unknown': true,

		// Disallow unknown type selectors
		// https://stylelint.io/user-guide/rules/list/selector-type-no-unknown/
		'selector-type-no-unknown': [true, {
			ignore: ['custom-elements'],
		}],

		// Disallow unknown media feature names
		// https://stylelint.io/user-guide/rules/list/media-feature-name-no-unknown/
		'media-feature-name-no-unknown': true,

		// Disallow unknown at-rules
		// https://stylelint.io/user-guide/rules/list/at-rule-no-unknown/
		'at-rule-no-unknown': true,

		// Disallow empty comments
		// https://stylelint.io/user-guide/rules/list/comment-no-empty/
		'comment-no-empty': true,

		// Disallow selectors of lower specificity from coming after overriding selectors of higher specificity
		// https://stylelint.io/user-guide/rules/list/no-descending-specificity/
		'no-descending-specificity': true,

		// Disallow duplicate `@import` rules within a stylesheet
		// https://stylelint.io/user-guide/rules/list/no-duplicate-at-import-rules/
		'no-duplicate-at-import-rules': true,

		// Disallow duplicate selectors within a stylesheet
		// https://stylelint.io/user-guide/rules/list/no-duplicate-selectors/
		'no-duplicate-selectors': true,

		// Disallow empty sources
		// https://stylelint.io/user-guide/rules/list/no-empty-source/
		'no-empty-source': true,

		// Disallow double-slash comments which are not supported by CSS
		// https://stylelint.io/user-guide/rules/list/no-invalid-double-slash-comments/
		'no-invalid-double-slash-comments': true,

		// Disallow invalid position @import rules within a stylesheet
		// https://stylelint.io/user-guide/rules/list/no-invalid-position-at-import-rule/
		'no-invalid-position-at-import-rule': true,
	},
};
