module.exports = {
	rules: {
		// #region Descending

		// Disallow selectors of lower specificity from coming after overriding selectors of higher specificity
		// https://stylelint.io/user-guide/rules/list/no-descending-specificity/
		'no-descending-specificity': true,

		// #endregion

		// #region Duplicate

		// Disallow duplicate custom properties within declaration blocks
		// https://stylelint.io/user-guide/rules/list/declaration-block-no-duplicate-custom-properties/
		'declaration-block-no-duplicate-custom-properties': true,

		// Disallow duplicate properties within declaration blocks (autofixable but might be confusing)
		// https://stylelint.io/user-guide/rules/list/declaration-block-no-duplicate-properties/
		'!declaration-block-no-duplicate-properties': [true, {
			ignore: [
				'consecutive-duplicates-with-different-values',
				'consecutive-duplicates-with-different-syntaxes',
			],
		}],

		// Disallow duplicate font family names (autofixable but might be confusing)
		// https://stylelint.io/user-guide/rules/list/font-family-no-duplicate-names/
		'!font-family-no-duplicate-names': [true, {
			ignoreFontFamilyNames: ['monospace'],
		}],

		// Disallow duplicate selectors within `keyframe` blocks.
		// https://stylelint.io/user-guide/rules/list/keyframe-block-no-duplicate-selectors/
		'keyframe-block-no-duplicate-selectors': true,

		// Disallow duplicate `@import` rules within a stylesheet
		// https://stylelint.io/user-guide/rules/list/no-duplicate-at-import-rules/
		'no-duplicate-at-import-rules': true,

		// Disallow duplicate selectors within a stylesheet
		// https://stylelint.io/user-guide/rules/list/no-duplicate-selectors/
		'no-duplicate-selectors': true,

		// #endregion

		// #region Empty

		// Disallow empty blocks
		// https://stylelint.io/user-guide/rules/list/block-no-empty/
		// Note: it's good sometimes to show nesting or pseudo-nesting (BEM) depth
		'block-no-empty': null,

		// Disallow empty comments
		// https://stylelint.io/user-guide/rules/list/comment-no-empty/
		'comment-no-empty': true,

		// Disallow empty sources
		// https://stylelint.io/user-guide/rules/list/no-empty-source/
		'no-empty-source': true,

		// #endregion

		// #region Invalid

		// Disallow invalid hex colors
		// https://stylelint.io/user-guide/rules/list/color-no-invalid-hex/
		'color-no-invalid-hex': true,

		// Disallow an unspaced operator within calc functions
		// https://stylelint.io/user-guide/rules/list/function-calc-no-unspaced-operator/
		'function-calc-no-unspaced-operator': true,

		// Disallow `!important` within keyframe declarations
		// https://stylelint.io/user-guide/rules/list/keyframe-declaration-no-important/
		'keyframe-declaration-no-important': true,

		// Disallow invalid named grid areas
		// https://stylelint.io/user-guide/rules/list/named-grid-areas-no-invalid/
		'named-grid-areas-no-invalid': true,

		// Disallow double-slash comments which are not supported by CSS
		// https://stylelint.io/user-guide/rules/list/no-invalid-double-slash-comments/
		'no-invalid-double-slash-comments': true,

		// Disallow invalid position @import rules within a stylesheet
		// https://stylelint.io/user-guide/rules/list/no-invalid-position-at-import-rule/
		'no-invalid-position-at-import-rule': true,

		// Disallow (unescaped) newlines in strings
		// https://stylelint.io/user-guide/rules/list/string-no-newline/
		'string-no-newline': true,

		// #endregion

		// #region Irregular

		// Disallow irregular whitespace
		// https://stylelint.io/user-guide/rules/list/no-irregular-whitespace/
		'no-irregular-whitespace': true,

		// #endregion

		// #region Missing

		// Disallow missing `var` function for custom properties
		// https://stylelint.io/user-guide/rules/list/custom-property-no-missing-var-function/
		'custom-property-no-missing-var-function': true,

		// Disallow missing generic families in lists
		// https://stylelint.io/user-guide/rules/list/font-family-no-missing-generic-family-keyword/
		'font-family-no-missing-generic-family-keyword': true,

		// #endregion

		// #region Non-standard

		// Disallow direction values in `linear-gradient()` calls that are not valid according to the standard syntax
		// https://stylelint.io/user-guide/rules/list/function-linear-gradient-no-nonstandard-direction/
		'function-linear-gradient-no-nonstandard-direction': true,

		// #endregion

		// #region Overrides

		// Disallow shorthand properties that override related longhand properties
		// https://stylelint.io/user-guide/rules/list/declaration-block-no-shorthand-property-overrides/
		'declaration-block-no-shorthand-property-overrides': true,

		// #endregion

		// #region Unmatchable

		// Disallow unmatchable `An+B` selectors
		// https://stylelint.io/user-guide/rules/selector-anb-no-unmatchable/
		'selector-anb-no-unmatchable': true,

		// #endregion

		// #region Unknown

		// Disallow unknown annotations
		// https://stylelint.io/user-guide/rules/list/annotation-no-unknown/
		'annotation-no-unknown': true,

		// Disallow unknown at-rules
		// https://stylelint.io/user-guide/rules/list/at-rule-no-unknown/
		'at-rule-no-unknown': true,

		// Disallow unknown values for properties within declarations
		// https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown/
		'declaration-property-value-no-unknown': true,

		// Disallow unknown functions
		// https://stylelint.io/user-guide/rules/list/function-no-unknown
		'function-no-unknown': true,

		// Disallow unknown media feature names
		// https://stylelint.io/user-guide/rules/list/media-feature-name-no-unknown/
		'media-feature-name-no-unknown': true,

		// Disallow unknown animations
		// https://stylelint.io/user-guide/rules/list/no-unknown-animations/
		'no-unknown-animations': true,

		// Disallow unknown custom properties
		// https://stylelint.io/user-guide/rules/no-unknown-custom-properties/
		'no-unknown-custom-properties': null,

		// Disallow unknown properties
		// https://stylelint.io/user-guide/rules/list/property-no-unknown/
		'property-no-unknown': [true, {
			ignoreProperties: ['/^lost-/'], // PostCSS Lost Grid // @TODO: Is it time to remove?
		}],

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

		// Disallow unknown units
		// https://stylelint.io/user-guide/rules/list/unit-no-unknown/
		'unit-no-unknown': true,

		// #endregion
	},
};
