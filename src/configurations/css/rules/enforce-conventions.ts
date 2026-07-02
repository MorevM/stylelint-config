import { BEM_CUSTOM_PROPERTY, KEBAB_CASE, KEBAB_CASE_ALLOW_DOT, WARNING } from '#constants';

export default {
	rules: {
		// #region Allowed, disallowed & required

		// At-rule

		// Specify a list of allowed at-rules
		// https://stylelint.io/user-guide/rules/list/at-rule-allowed-list/
		'at-rule-allowed-list': null,

		// Specify a list of disallowed at-rules
		// https://stylelint.io/user-guide/rules/list/at-rule-disallowed-list/
		'at-rule-disallowed-list': null,

		// Disallow vendor prefixes for at-rules (autofixable)
		// https://stylelint.io/user-guide/rules/list/at-rule-no-vendor-prefix/
		'at-rule-no-vendor-prefix': [true, { severity: WARNING }],

		// Specify a list of required properties for an at-rule
		// https://stylelint.io/user-guide/rules/list/at-rule-property-required-list/
		'at-rule-property-required-list': {
			'font-face': ['font-display', 'font-family'],
		},

		// Color

		// Require or disallow alpha channel for hex colors
		// https://stylelint.io/user-guide/rules/list/color-hex-alpha/
		// Note: It depends
		'color-hex-alpha': null,

		// Require (where possible) or disallow named colors
		// https://stylelint.io/user-guide/rules/list/color-named/
		// Note: It depends
		'color-named': null,

		// Disallow hex colors
		// https://stylelint.io/user-guide/rules/list/color-no-hex/
		// Note: HEX is a base option mostly
		'color-no-hex': null,

		// Comment

		// Specify a list of disallowed words within comments
		// https://stylelint.io/user-guide/rules/list/comment-word-disallowed-list/
		'comment-word-disallowed-list': null,

		// Declaration

		// Disallow `!important` within declarations
		// https://stylelint.io/user-guide/rules/list/declaration-no-important/
		// Note: Well, maybe in the next life
		'declaration-no-important': null,

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

		// Function

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

		// Specify a list of allowed URL schemes
		// https://stylelint.io/user-guide/rules/list/function-url-scheme-allowed-list/
		'function-url-scheme-allowed-list': null,

		// Specify a list of disallowed URL schemes
		// https://stylelint.io/user-guide/rules/list/function-url-scheme-disallowed-list/
		'function-url-scheme-disallowed-list': null,

		// Length

		// Disallow units for zero lengths (autofixable)
		// https://stylelint.io/user-guide/rules/list/length-zero-no-unit/
		'length-zero-no-unit': [true, {
			severity: WARNING,
			ignore: ['custom-properties'],
			ignorePreludeOfAtRules: ['function', 'mixin'],
		}],

		// Media feature

		// Specify a list of allowed media feature names
		// https://stylelint.io/user-guide/rules/list/media-feature-name-allowed-list/
		'media-feature-name-allowed-list': null,

		// Specify a list of disallowed media feature names
		// https://stylelint.io/user-guide/rules/list/media-feature-name-disallowed-list/
		'media-feature-name-disallowed-list': null,

		// Disallow vendor prefixes for media feature names (autofixable)
		// https://stylelint.io/user-guide/rules/list/media-feature-name-no-vendor-prefix/
		'media-feature-name-no-vendor-prefix': [true, { severity: WARNING }],

		// Specify a list of allowed name and unit pairs within media features
		// https://stylelint.io/user-guide/rules/media-feature-name-unit-allowed-list/
		'media-feature-name-unit-allowed-list': null,

		// Specify a list of allowed media feature name and value pairs
		// https://stylelint.io/user-guide/rules/list/media-feature-name-value-allowed-list/
		'media-feature-name-value-allowed-list': null,

		// Property

		// Specify a list of allowed properties
		// https://stylelint.io/user-guide/rules/list/property-allowed-list/
		'property-allowed-list': null,

		// Specify a list of disallowed properties
		// https://stylelint.io/user-guide/rules/list/property-disallowed-list/
		'property-disallowed-list': null,

		// Disallow vendor prefixes for properties (autofixable)
		// https://stylelint.io/user-guide/rules/list/property-no-vendor-prefix/
		'property-no-vendor-prefix': [true, {
			ignoreProperties: ['-webkit-text-size-adjust'],
		}],

		// Rule

		// Require rules to be nested in specific at-rules
		// https://stylelint.io/user-guide/rules/rule-nesting-at-rule-required-list/
		'rule-nesting-at-rule-required-list': null,

		// Specify a list of disallowed properties for selectors within rules
		// https://stylelint.io/user-guide/rules/list/rule-selector-property-disallowed-list/
		'rule-selector-property-disallowed-list': null,

		// Selector

		// Specify a list of disallowed attribute names
		// https://stylelint.io/user-guide/rules/list/selector-attribute-name-disallowed-list/
		'selector-attribute-name-disallowed-list': null,

		// Specify a list of allowed attribute operators
		// https://stylelint.io/user-guide/rules/list/selector-attribute-operator-allowed-list/
		'selector-attribute-operator-allowed-list': null,

		// Specify a list of disallowed attribute operators
		// https://stylelint.io/user-guide/rules/list/selector-attribute-operator-disallowed-list/
		'selector-attribute-operator-disallowed-list': null,

		// Specify a list of allowed combinators
		// https://stylelint.io/user-guide/rules/list/selector-combinator-allowed-list/
		'selector-combinator-allowed-list': null,

		// Specify a list of disallowed combinators
		// https://stylelint.io/user-guide/rules/list/selector-combinator-disallowed-list/
		'selector-combinator-disallowed-list': null,

		// Specify a list of disallowed selectors
		// https://stylelint.io/user-guide/rules/list/selector-disallowed-list/
		'selector-disallowed-list': null,

		// Disallow qualifying a selector by type
		// https://stylelint.io/user-guide/rules/list/selector-no-qualifying-type/
		'selector-no-qualifying-type': null,

		// Disallow vendor prefixes for selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-no-vendor-prefix/
		'selector-no-vendor-prefix': [true, {
			ignoreSelectors: ['::-ms-input-placeholder'],
			severity: WARNING,
		}],

		// Specify a list of allowed pseudo-class selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-class-allowed-list/
		'selector-pseudo-class-allowed-list': null,

		// Specify a list of disallowed pseudo-class selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-class-disallowed-list/
		'selector-pseudo-class-disallowed-list': null,

		// Specify a list of allowed pseudo-element selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-element-allowed-list/
		'selector-pseudo-element-allowed-list': null,

		// Specify a list of disallowed pseudo-element selectors
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-element-disallowed-list/
		'selector-pseudo-element-disallowed-list': null,

		// Unit

		// Specify a list of allowed units
		// https://stylelint.io/user-guide/rules/list/unit-allowed-list/
		'unit-allowed-list': null,

		// Specify a list of disallowed units
		// https://stylelint.io/user-guide/rules/list/unit-disallowed-list/
		'unit-disallowed-list': null,

		// Value

		// Disallow vendor prefixes for values (autofixable)
		// https://stylelint.io/user-guide/rules/list/value-no-vendor-prefix/
		'value-no-vendor-prefix': [true, { severity: WARNING }],

		// #endregion

		// #region Case

		// Specify lowercase or uppercase for function names (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-name-case/
		'function-name-case': ['lower', { severity: WARNING }],

		// Specify lowercase or uppercase for type selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-type-case/
		'selector-type-case': ['lower', { severity: WARNING }],

		// Specify lowercase or uppercase for keywords values (autofixable)
		// https://stylelint.io/user-guide/rules/list/value-keyword-case/
		'value-keyword-case': ['lower', {
			camelCaseSvgKeywords: true,
			ignoreProperties: [
				'font-family',
				'/^--/',
			],
			severity: WARNING,
		}],

		// #endregion

		// #region Empty lines

		// Require or disallow an empty line before at-rules (autofixable)
		// https://stylelint.io/user-guide/rules/list/at-rule-empty-line-before/
		'at-rule-empty-line-before': ['always', {
			except: ['blockless-after-same-name-blockless', 'first-nested'],
			ignore: ['after-comment'],
			ignoreAtRules: ['if', 'else', 'include'], // No effect for CSS, but good for extending with SCSS
			severity: WARNING,
		}],

		// Require or disallow an empty line before comments (autofixable)
		// https://stylelint.io/user-guide/rules/list/comment-empty-line-before/
		'comment-empty-line-before': ['always', {
			except: ['first-nested'],
			ignore: ['stylelint-commands'],
			severity: WARNING,
		}],

		// Require or disallow an empty line before custom properties (autofixable)
		// https://stylelint.io/user-guide/rules/list/custom-property-empty-line-before/
		'custom-property-empty-line-before': ['always', {
			except: ['after-custom-property', 'first-nested'],
			ignore: ['after-comment', 'inside-single-line-block', 'after-custom-property'],
			severity: WARNING,
		}],

		// Require or disallow an empty line before declarations (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-empty-line-before/
		'declaration-empty-line-before': [null, { severity: WARNING }], // @TODO: Investigate: Conflicts with `scss/$dollar-variable`

		// Require or disallow an empty line before rules (autofixable)
		// https://stylelint.io/user-guide/rules/list/rule-empty-line-before/
		'rule-empty-line-before': ['always-multi-line', {
			except: ['first-nested'],
			ignore: ['after-comment'],
			severity: WARNING,
		}],

		// #endregion

		// #region Layout mappings

		// Specify flow-relative or physical layout mappings for properties (autofixable)
		// https://stylelint.io/user-guide/rules/property-layout-mappings/
		'property-layout-mappings': ['flow-relative', {
			ignoreProperties: [],
			severity: WARNING,
		}],

		// Specify flow-relative or physical layout mappings for units (autofixable)
		// https://stylelint.io/user-guide/rules/unit-layout-mappings/
		'unit-layout-mappings': ['flow-relative', {
			ignoreUnits: [],
			severity: WARNING,
		}],

		// Specify flow-relative or physical layout mappings for value keywords (autofixable)
		// https://stylelint.io/user-guide/rules/value-keyword-layout-mappings/
		'value-keyword-layout-mappings': ['flow-relative', {
			ignoreProperties: [],
			severity: WARNING,
		}],

		// #endregion

		// #region Max & min

		// Limit the number of declarations within a single-line declaration block
		// https://stylelint.io/user-guide/rules/list/declaration-block-single-line-max-declarations/
		// Note: Sometimes we can save a lot of vertical spacing using repeating structures
		'declaration-block-single-line-max-declarations': 3,

		// Limit the number of values for a list of properties within declarations
		// https://stylelint.io/user-guide/rules/list/declaration-property-max-values/
		'declaration-property-max-values': null,

		// Limit the depth of nesting
		// https://stylelint.io/user-guide/rules/list/max-nesting-depth/
		'max-nesting-depth': [4, {
			ignore: ['blockless-at-rules', 'pseudo-classes'],
		}],

		// Limit the number of decimal places allowed in numbers
		// https://stylelint.io/user-guide/rules/list/number-max-precision/
		'number-max-precision': 3,

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

		// Specify the minimum number of milliseconds for time values
		// https://stylelint.io/user-guide/rules/list/time-min-milliseconds/
		'time-min-milliseconds': null,

		// #endregion

		// #region Notation

		// Specify percentage or number notation for alpha-values (autofixable)
		// https://stylelint.io/user-guide/rules/list/alpha-value-notation/
		'alpha-value-notation': ['number', { severity: WARNING }],

		// Specify alias notation for color-functions (autofixable)
		// https://stylelint.io/user-guide/rules/color-function-alias-notation/
		'color-function-alias-notation': ['without-alpha', { severity: WARNING }],

		// Specify modern or legacy notation for applicable color-functions (autofixable)
		// https://stylelint.io/user-guide/rules/list/color-function-notation/
		'color-function-notation': ['modern', { severity: WARNING }],

		// Specify short or long notation for hex colors (autofixable)
		// https://stylelint.io/user-guide/rules/list/color-hex-length/
		// Note: more consistent view using repeating colors
		'color-hex-length': ['long', { severity: WARNING }],

		// Specify short or full notation for the display property (autofixable)
		// https://stylelint.io/user-guide/rules/display-notation/
		'display-notation': ['full', { severity: WARNING }],

		// Require numeric or named (where possible) font-weight values (autofixable).
		// Also, when named values are expected, require only valid names
		// https://stylelint.io/user-guide/rules/list/font-weight-notation/
		'font-weight-notation': ['numeric', {
			ignore: ['relative'],
			severity: WARNING,
		}],

		// Specify number or angle notation for degree hues (autofixable)
		// https://stylelint.io/user-guide/rules/list/hue-degree-notation/
		'hue-degree-notation': ['angle', { severity: WARNING }],

		// Specify string or URL notation for `@import` rules (autofixable)
		// https://stylelint.io/user-guide/rules/list/import-notation
		'import-notation': ['string', { severity: WARNING }],

		// Specify keyword or percentage notation for keyframe selectors (autofixable)
		// https://stylelint.io/user-guide/rules/list/keyframe-selector-notation/
		'keyframe-selector-notation': ['percentage-unless-within-keyword-only-block', { severity: WARNING }],

		// Specify number or percentage notation for lightness (autofixable)
		// https://stylelint.io/user-guide/rules/list/keyframe-selector-notation/
		'lightness-notation': ['percentage', { severity: WARNING }],

		// Specify context or prefix notation for media feature ranges (autofixable)
		// https://stylelint.io/user-guide/rules/media-feature-range-notation/
		'media-feature-range-notation': ['context', {
			except: [],
			severity: WARNING,
		}],

		// Specify explicit or implicit nesting notation for relative selectors (autofixable)
		// https://stylelint.io/user-guide/rules/relative-selector-nesting-notation/
		'relative-selector-nesting-notation': ['implicit', { severity: WARNING }],

		// Specify simple or complex notation for `:not()` pseudo-classes (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-not-notation/
		'selector-not-notation': ['complex', { severity: WARNING }],

		// Specify single or double colon notation for applicable pseudo-elements (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-pseudo-element-colon-notation/
		'selector-pseudo-element-colon-notation': ['double', { severity: WARNING }],

		// #endregion

		// #region Pattern

		// Specify a pattern for comments
		// https://stylelint.io/user-guide/rules/list/comment-pattern/
		'comment-pattern': null,

		// Specify a pattern for container names
		// https://stylelint.io/user-guide/rules/container-name-pattern/
		'container-name-pattern': [KEBAB_CASE, {
			message: 'Expected container name to be kebab-case',
		}],

		// Specify a pattern for custom media query names
		// https://stylelint.io/user-guide/rules/list/custom-media-pattern/
		'custom-media-pattern': [KEBAB_CASE, {
			message: 'Expected custom media query name to be kebab-case',
		}],

		// Specify a pattern for custom properties
		// https://stylelint.io/user-guide/rules/list/custom-property-pattern/
		'custom-property-pattern': [BEM_CUSTOM_PROPERTY, {
			message: 'Expected custom property name to be kebab-case or BEM-like',
		}],

		// Specify a pattern for keyframe names
		// https://stylelint.io/user-guide/rules/list/keyframes-name-pattern/
		'keyframes-name-pattern': [KEBAB_CASE, {
			message: 'Expected keyframe name to be kebab-case',
		}],

		// Specify a pattern for layer names
		// https://stylelint.io/user-guide/rules/layer-name-pattern/
		'layer-name-pattern': [KEBAB_CASE_ALLOW_DOT, {
			message: 'Expected layer name to be kebab-case',
		}],

		// Specify a pattern for class selectors
		// https://stylelint.io/user-guide/rules/list/selector-class-pattern/
		// Note: Breaks BEM in edge cases
		'selector-class-pattern': [null, {
			message: 'Expected class selector to be kebab-case',
		}],

		// Specify a pattern for ID selector
		// https://stylelint.io/user-guide/rules/list/selector-id-pattern/
		'selector-id-pattern': [KEBAB_CASE, {
			message: 'Expected id selector to be kebab-case',
		}],

		// Specify a pattern for the selectors of rules nested within rule
		// https://stylelint.io/user-guide/rules/list/selector-nested-pattern/
		'selector-nested-pattern': null,

		// #endregion

		// #region Quotes

		// Specify whether or not quotation marks should be used around font family names (autofixable)
		// https://stylelint.io/user-guide/rules/list/font-family-name-quotes/
		'font-family-name-quotes': ['always-where-recommended', { severity: WARNING }],

		// Require or disallow quotes for urls (autofixable)
		// https://stylelint.io/user-guide/rules/list/function-url-quotes/
		'function-url-quotes': ['always', {
			except: ['empty'],
			severity: WARNING,
		}],

		// Require or disallow quotes for attribute value (autofixable)
		// https://stylelint.io/user-guide/rules/list/selector-attribute-quotes/
		'selector-attribute-quotes': ['always', { severity: WARNING }],

		// #endregion

		// #region Redundant

		// Disallow redundant nested style rules within blocks
		// https://stylelint.io/user-guide/rules/block-no-redundant-nested-style-rules/
		'block-no-redundant-nested-style-rules': true,

		// Disallow longhand properties that can be combined into one shorthand property (autofixable)
		// https://stylelint.io/user-guide/rules/list/declaration-block-no-redundant-longhand-properties/
		'declaration-block-no-redundant-longhand-properties': [true, {
			ignoreShorthands: [
				'/grid/', 'flex-flow', 'place-items', // getting hard to read, the developer knows better
				'/transition/', // gets very messy in the case of multiple properties
			],
			severity: WARNING,
		}],

		// Disallow redundant values in shorthand properties (autofixable)
		// https://stylelint.io/user-guide/rules/list/shorthand-property-no-redundant-values/
		'shorthand-property-no-redundant-values': [true, { severity: WARNING }],

		// #endregion

		// #region Whitespace inside

		// Require or disallow whitespace on the inside of comment markers (autofixable)
		// https://stylelint.io/user-guide/rules/list/comment-whitespace-inside/
		'comment-whitespace-inside': ['always', { severity: WARNING }],

		// #endregion
	},
};
