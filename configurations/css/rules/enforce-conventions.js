const { KEBAB_CASE } = require('../../../utils/constants.js');

module.exports = {
	rules: {
		// Specify percentage or number notation for alpha-values (autofixable)
		// https://stylelint.io/user-guide/rules/list/alpha-value-notation/
		'+alpha-value-notation': 'number',

		// Specify number or angle notation for degree hues (autofixable)
		// https://stylelint.io/user-guide/rules/list/hue-degree-notation/
		'+hue-degree-notation': 'angle',

		// Specify modern or legacy notation for applicable color-functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/color-function-notation/
		'+color-function-notation': 'modern',

		// Require or disallow alpha channel for hex colors
		// https://stylelint.io/user-guide/rules/list/color-hex-alpha/
		// Note: It depends
		'color-hex-alpha': null,

		// Specify short or long notation for hex colors (autofixable)
		// https://stylelint.io/user-guide/rules/list/color-hex-length/
		// Note: more consistent view in repeating colors
		'+color-hex-length': 'long',

		// Require (where possible) or disallow named colors
		// https://stylelint.io/user-guide/rules/list/color-named/
		// Note: It depends
		'color-named': null,

		// Disallow hex colors
		// https://stylelint.io/user-guide/rules/list/color-no-hex/
		// Note: HEX is base option mostly
		'color-no-hex': null,

		// Disallow units for zero lengths (autofixable)
		// https://stylelint.io/user-guide/rules/list/length-zero-no-unit/
		'+length-zero-no-unit': true,

		// Specify whether or not quotation marks should be used around font family names
		// https://stylelint.io/user-guide/rules/list/font-family-name-quotes/
		'font-family-name-quotes': 'always-where-recommended',

		// Require numeric or named (where possible) font-weight values (autofixable).
		// Also, when named values are expected, require only valid names
		// https://stylelint.io/user-guide/rules/list/font-weight-notation/
		'+font-weight-notation': ['numeric', {
			ignore: ['relative'],
		}],

		// Specify a list of allowed functions
		// https://stylelint.io/user-guide/rules/list/function-allowed-list/
		'function-allowed-list': null,

		// Specify a list of disallowed functions
		// https://stylelint.io/user-guide/rules/list/function-disallowed-list/
		'function-disallowed-list': null,

		// Disallow scheme-relative urls
		// https://stylelint.io/user-guide/rules/list/function-url-no-scheme-relative/
		// Note: only `https`
		'function-url-no-scheme-relative': true,

		// Require or disallow quotes for urls
		// https://stylelint.io/user-guide/rules/list/function-url-quotes/
		'function-url-quotes': ['always', {
			except: ['empty'],
		}],

		// Specify a list of allowed URL schemes
		// https://stylelint.io/user-guide/rules/list/function-url-scheme-allowed-list/
		'function-url-scheme-allowed-list': null,

		// Specify a list of disallowed URL schemes
		// https://stylelint.io/user-guide/rules/list/function-url-scheme-disallowed-list/
		'function-url-scheme-disallowed-list': null,

		// Specify string or URL notation for `@import` rules (autofixable)
		// https://stylelint.io/user-guide/rules/list/import-notation
		'+import-notation': 'string',

		// Specify keyword or percentage notation for keyframe selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/keyframe-selector-notation/
		'+keyframe-selector-notation': 'percentage-unless-within-keyword-only-block',

		// Specify context or prefix notation for media feature ranges
		// https://stylelint.io/user-guide/rules/media-feature-range-notation/
		// TODO: [2024-05-11] Enable
		'media-feature-range-notation': null,

		// Specify a pattern for keyframe names
		// https://stylelint.io/user-guide/rules/list/keyframes-name-pattern/
		'keyframes-name-pattern': [KEBAB_CASE, {
			message: 'Expected keyframe name to be kebab-case',
		}],

		// Limit the number of decimal places allowed in numbers
		// https://stylelint.io/user-guide/rules/list/number-max-precision/
		'number-max-precision': 3,

		// Specify the minimum number of milliseconds for time values
		// https://stylelint.io/user-guide/rules/list/time-min-milliseconds/
		'time-min-milliseconds': null,

		// Specify a list of allowed units
		// https://stylelint.io/user-guide/rules/list/unit-allowed-list/
		'unit-allowed-list': null,

		// Specify a list of disallowed units
		// https://stylelint.io/user-guide/rules/list/unit-disallowed-list/
		'unit-disallowed-list': null,

		// Disallow redundant values in shorthand properties (autofixable)
		// https://stylelint.io/user-guide/rules/list/shorthand-property-no-redundant-values/
		'+shorthand-property-no-redundant-values': true,

		// Disallow vendor prefixes for values (autofixable)
		// https://stylelint.io/user-guide/rules/list/value-no-vendor-prefix/
		'+value-no-vendor-prefix': true,

		// Specify a pattern for custom properties
		// https://stylelint.io/user-guide/rules/list/custom-property-pattern/
		'custom-property-pattern': [KEBAB_CASE, {
			message: 'Expected custom property name to be kebab-case',
		}],

		// Specify a list of allowed properties
		// https://stylelint.io/user-guide/rules/list/property-allowed-list/
		'property-allowed-list': null,

		// Specify a list of disallowed properties
		// https://stylelint.io/user-guide/rules/list/property-disallowed-list/
		'property-disallowed-list': null,

		// Disallow vendor prefixes for properties (autofixable)
		// https://stylelint.io/user-guide/rules/list/property-no-vendor-prefix/
		'property-no-vendor-prefix': true,

		// Disallow longhand properties that can be combined into one shorthand property
		// https://stylelint.io/user-guide/rules/list/declaration-block-no-redundant-longhand-properties/
		'declaration-block-no-redundant-longhand-properties': [true, {
			ignoreShorthands: ['/grid/', 'flex-flow'], // Sometimes grids get hard to read
		}],

		// Disallow `!important` within declarations
		// https://stylelint.io/user-guide/rules/list/declaration-no-important/
		// Note: well, maybe in next life
		'declaration-no-important': null,

		// Limit the number of values for a list of properties within declarations
		// https://stylelint.io/user-guide/rules/list/declaration-property-max-values/
		'declaration-property-max-values': null,

		// Specify a list of allowed property and unit pairs within declarations
		// https://stylelint.io/user-guide/rules/list/declaration-property-unit-allowed-list/
		'declaration-property-unit-allowed-list': null,

		// Specify a list of disallowed property and unit pairs within declarations
		// https://stylelint.io/user-guide/rules/list/declaration-property-unit-disallowed-list/
		'declaration-property-unit-disallowed-list': null,

		// Specify a list of allowed property and value pairs within declarations
		// https://stylelint.io/user-guide/rules/list/declaration-property-value-allowed-list/
		'declaration-property-value-allowed-list': null,

		// Specify a list of disallowed property and value pairs within declarations
		// https://stylelint.io/user-guide/rules/list/declaration-property-value-disallowed-list/
		'declaration-property-value-disallowed-list': null,

		// Limit the number of declarations within a single-line declaration block
		// https://stylelint.io/user-guide/rules/list/declaration-block-single-line-max-declarations/
		// Note: Sometimes we can save a lot of vertical spacing with repeating structures
		'declaration-block-single-line-max-declarations': 3,

		// Specify a list of disallowed attribute names
		// https://stylelint.io/user-guide/rules/list/selector-attribute-name-disallowed-list/
		'selector-attribute-name-disallowed-list': null,

		// Specify a list of allowed attribute operators
		// https://stylelint.io/user-guide/rules/list/selector-attribute-operator-allowed-list/
		'selector-attribute-operator-allowed-list': null,

		// Specify a list of disallowed attribute operators
		// https://stylelint.io/user-guide/rules/list/selector-attribute-operator-disallowed-list/
		'selector-attribute-operator-disallowed-list': null,

		// Require or disallow quotes for attribute value (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-attribute-quotes/
		'+selector-attribute-quotes': 'always',

		// Specify a pattern for class selectors
		// https://stylelint.io/user-guide/rules/list/selector-class-pattern/
		// Note: Breaks BEM in edge cases
		'selector-class-pattern': [null, {
			message: 'Expected class selector to be kebab-case',
		}],

		// Specify a list of allowed combinators
		// https://stylelint.io/user-guide/rules/list/selector-combinator-allowed-list/
		'selector-combinator-allowed-list': null,

		// Specify a list of disallowed combinators
		// https://stylelint.io/user-guide/rules/list/selector-combinator-disallowed-list/
		'selector-combinator-disallowed-list': null,

		// Specify a list of disallowed selectors
		// https://stylelint.io/user-guide/rules/list/selector-disallowed-list/
		'selector-disallowed-list': null,

		// Specify a pattern for ID selector
		// https://stylelint.io/user-guide/rules/list/selector-id-pattern/
		'selector-id-pattern': [KEBAB_CASE, {
			message: 'Expected id selector to be kebab-case',
		}],

		// Limit the number of attribute selectors in a selector
		// https://stylelint.io/user-guide/rules/list/selector-max-attribute/
		'selector-max-attribute': null,

		// Limit the number of classes in a selector
		// https://stylelint.io/user-guide/rules/list/selector-max-class/
		'selector-max-class': 3,

		// Limit the number of combinators in a selector
		// https://stylelint.io/user-guide/rules/list/selector-max-combinators/
		'selector-max-combinators': null,

		// Limit the number of compound selectors in a selector
		// https://stylelint.io/user-guide/rules/list/selector-max-compound-selectors/
		'selector-max-compound-selectors': null,

		// Limit the number of ID selectors in a selector
		// https://stylelint.io/user-guide/rules/list/selector-max-id/
		'selector-max-id': 1,

		// Limit the number of pseudo-classes in a selector
		// https://stylelint.io/user-guide/rules/list/selector-max-pseudo-class/
		'selector-max-pseudo-class': null,

		// Limit the specificity of selectors
		// https://stylelint.io/user-guide/rules/list/selector-max-specificity/
		'selector-max-specificity': null,

		// Limit the number of type in a selector
		// https://stylelint.io/user-guide/rules/list/selector-max-type/
		'selector-max-type': null,

		// Limit the number of universal selectors in a selector
		// https://stylelint.io/user-guide/rules/list/selector-max-universal/
		'selector-max-universal': null,

		// Specify a pattern for the selectors of rules nested within rule
		// https://stylelint.io/user-guide/rules/list/selector-nested-pattern/
		'selector-nested-pattern': null,

		// Disallow qualifying a selector by type
		// https://stylelint.io/user-guide/rules/list/selector-no-qualifying-type/
		'selector-no-qualifying-type': null,

		// Disallow vendor prefixes for selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-no-vendor-prefix/
		'+selector-no-vendor-prefix': [true, {
			ignoreSelectors: ['::-ms-input-placeholder'],
		}],

		// Specify simple or complex notation for `:not()` pseudo-classes (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-not-notation/
		'+selector-not-notation': 'complex',

		// Specify a list of allowed pseudo-class selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-class-allowed-list/
		'selector-pseudo-class-allowed-list': null,

		// Specify a list of disallowed pseudo-class selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-class-disallowed-list/
		'selector-pseudo-class-disallowed-list': null,

		// Specify a list of allowed pseudo-element selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-element-allowed-list/
		'selector-pseudo-element-allowed-list': null,

		// Specify single or double colon notation for applicable pseudo-elements (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-element-colon-notation/
		'+selector-pseudo-element-colon-notation': 'double',

		// Specify a list of disallowed pseudo-element selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-element-disallowed-list/
		'selector-pseudo-element-disallowed-list': null,

		// Specify a list of disallowed properties for selectors within rules
		// https://stylelint.io/user-guide/rules/list/rule-selector-property-disallowed-list/
		'rule-selector-property-disallowed-list': null,

		// Specify a list of allowed media feature names
		// https://stylelint.io/user-guide/rules/list/media-feature-name-allowed-list/
		'media-feature-name-allowed-list': null,

		// Specify a list of disallowed media feature names
		// https://stylelint.io/user-guide/rules/list/media-feature-name-disallowed-list/
		'media-feature-name-disallowed-list': null,

		// Disallow vendor prefixes for media feature names (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-feature-name-no-vendor-prefix/
		'+media-feature-name-no-vendor-prefix': true,

		// Specify a list of allowed media feature name and value pairs
		// https://stylelint.io/user-guide/rules/list/media-feature-name-value-allowed-list/
		'media-feature-name-value-allowed-list': null,

		// Specify a pattern for custom media query names
		// https://stylelint.io/user-guide/rules/list/custom-media-pattern/
		'custom-media-pattern': [KEBAB_CASE, {
			message: 'Expected custom media query name to be kebab-case',
		}],

		// Specify a list of allowed at-rules
		// https://stylelint.io/user-guide/rules/list/at-rule-allowed-list/
		'at-rule-allowed-list': null,

		// Specify a list of disallowed at-rules
		// https://stylelint.io/user-guide/rules/list/at-rule-disallowed-list/
		'at-rule-disallowed-list': null,

		// Disallow vendor prefixes for at-rules (autofixable)
		// https://stylelint.io/user-guide/rules/list/at-rule-no-vendor-prefix/
		'+at-rule-no-vendor-prefix': true,

		// Specify a list of required properties for an at-rule
		// https://stylelint.io/user-guide/rules/list/at-rule-property-required-list/
		'at-rule-property-required-list': {
			'font-face': ['font-display', 'font-family'],
		},

		// Specify a pattern for comments
		// https://stylelint.io/user-guide/rules/list/comment-pattern/
		'comment-pattern': null,

		// Specify a list of disallowed words within comments
		// https://stylelint.io/user-guide/rules/list/comment-word-disallowed-list/
		'comment-word-disallowed-list': null,

		// Limit the depth of nesting
		// https://stylelint.io/user-guide/rules/list/max-nesting-depth/
		'max-nesting-depth': [4, {
			ignore: ['blockless-at-rules', 'pseudo-classes'],
		}],

		// Disallow irregular whitespace
		// https://stylelint.io/user-guide/rules/list/no-irregular-whitespace/
		'no-irregular-whitespace': true,

		// Disallow unknown animations
		// https://stylelint.io/user-guide/rules/list/no-unknown-animations/
		'no-unknown-animations': true,

		// Require or disallow Unicode BOM
		// https://stylelint.io/user-guide/rules/list/unicode-bom/
		'unicode-bom': 'never',
	},
};
