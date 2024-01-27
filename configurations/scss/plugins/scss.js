const { KEBAB_CASE, KEBAB_CASE_ALLOW_FIRST_UNDERSCORE } = require('../../../utils/constants.js');

module.exports = {
	plugins: ['stylelint-scss'],
	rules: {
		// Works incorrect with SASS rgba()
		'color-function-notation': null,
		// SASS imports may be everywhere
		'no-invalid-position-at-import-rule': null,

		// Disallow redundant `@at-root` rule.
		// https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/at-root-no-redundant
		'scss/at-root-no-redundant': true,

		// This is a rule that checks for situations where users have:
		// * Done a loop using map-keys
		// * Grabbed the value for that key inside of the loop.
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-each-key-value-single-line/README.md
		'scss/at-each-key-value-single-line': true,

		// Require or disallow a newline after the closing brace of `@else` statements (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-closing-brace-newline-after/README.md
		'+scss/at-else-closing-brace-newline-after': 'always-last-in-chain',

		// Require a single space or disallow whitespace after the closing brace of `@else` statements (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-closing-brace-space-after/README.md
		'+scss/at-else-closing-brace-space-after': 'always-intermediate',

		// Require an empty line or disallow empty lines before `@`-else (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-empty-line-before/README.md
		'+scss/at-else-empty-line-before': 'never',

		// Require or disallow a space before `@else if` parentheses (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-if-parentheses-space-before/README.md
		'+scss/at-else-if-parentheses-space-before': 'always',

		// Disallow at-extends (`@extend`) with missing placeholders
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-extend-no-missing-placeholder/README.md
		'scss/at-extend-no-missing-placeholder': true,

		// Require named parameters in SCSS function call rule
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-named-arguments/README.md
		// Note: it depends
		'scss/at-function-named-arguments': null,

		// Require or disallow a space before `@function` parentheses (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-parentheses-space-before/README.md
		'+scss/at-function-parentheses-space-before': 'never',

		// Specify a pattern for Sass/SCSS-like function names
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-pattern/README.md
		'scss/at-function-pattern': KEBAB_CASE_ALLOW_FIRST_UNDERSCORE,

		// Require or disallow a newline after the closing brace of `@if` statements (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-closing-brace-newline-after/README.md
		'+scss/at-if-closing-brace-newline-after': 'always-last-in-chain',

		// Require a single space or disallow whitespace after the closing brace of `@if` statements (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-closing-brace-space-after/README.md
		'+scss/at-if-closing-brace-space-after': 'always-intermediate',

		// Check for equality to null is unnecessarily explicit since null is `falsy` in Sass
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-no-null/README.md
		// Note: It needed sometimes to catch exactly `null`
		'scss/at-if-no-null': null,

		// Disallow leading underscore in partial names in `@import`
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-import-no-partial-leading-underscore/README.md
		// Note: Whats wrong with that?
		'scss/at-import-no-partial-leading-underscore': null,

		// Require or disallow extension in @import commands
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-import-partial-extension/README.md
		'scss/at-import-partial-extension': 'never',

		// Specify blacklist of disallowed file extensions for partial names in `@import` commands
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-import-partial-extension-blacklist/README.md
		'scss/at-import-partial-extension-blacklist': null,

		// Specify whitelist of allowed file extensions for partial names in `@import` commands
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-import-partial-extension-whitelist/README.md
		'scss/at-import-partial-extension-whitelist': null,

		// Require or disallow parentheses in argumentless `@mixin` calls (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-argumentless-call-parentheses/README.md
		'+scss/at-mixin-argumentless-call-parentheses': 'never',

		// Require named parameters in at-mixin call rule
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-named-arguments/README.md
		// Note: It depends
		'scss/at-mixin-named-arguments': null,

		// Require or disallow a space before `@mixin` parentheses (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-parentheses-space-before/README.md
		'+scss/at-mixin-parentheses-space-before': 'never',

		// Specify a pattern for Sass/SCSS-like mixin names
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-pattern/README.md
		'scss/at-mixin-pattern': KEBAB_CASE_ALLOW_FIRST_UNDERSCORE,

		// Disallow parentheses in conditional `@` rules (`if`, `elsif`, `while`) (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-rule-conditional-no-parentheses/README.md
		'+scss/at-rule-conditional-no-parentheses': null, // Even want to reverse it such `false` :)

		// Disallow unknown at-rules
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-rule-no-unknown/README.md
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': [true, {
			ignoreAtRules: ['lost', 'include'],
		}],

		// Disallow usage of `@use` without a namespace
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-use-no-unnamespaced/README.md
		// TODO: [2025-01-01] Blocked because of VSCode support https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss
		'scss/at-use-no-unnamespaced': null,

		// Disallow redundant namespace aliases (i.e. @use "foo" as foo)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-use-no-redundant-alias/README.md
		'scss/at-use-no-redundant-alias': true,

		// Require a newline after the colon in `$`-variable declarations (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-colon-newline-after/README.md
		// Note: it depends
		'+scss/dollar-variable-colon-newline-after': null,

		// Require or disallow whitespace after the colon in `$`-variable declarations (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-colon-space-after/README.md
		'+scss/dollar-variable-colon-space-after': 'at-least-one-space',

		// Require a single space or disallow whitespace before the colon in `$`-variable declarations (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-colon-space-before/README.md
		'+scss/dollar-variable-colon-space-before': 'never',

		// Require `!default` flag for `$`-variable declarations
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-default/README.md
		// Note: It depends
		'scss/dollar-variable-default': null,

		// Require an empty line or disallow empty lines after `$`-variable declarations (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-empty-line-after/README.md
		'declaration-empty-line-before': null, // Conflicting
		'+scss/dollar-variable-empty-line-after': ['always', {
			except: ['last-nested', 'before-comment', 'before-dollar-variable'],
			ignore: ['before-comment', 'inside-single-line-block'],
		}],

		// Require an empty line or disallow empty lines before `$`-variable declarations (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-empty-line-before/README.md
		'+scss/dollar-variable-empty-line-before': ['always', {
			except: ['first-nested', 'after-comment', 'after-dollar-variable'],
			ignore: ['after-comment', 'inside-single-line-block'],
		}],

		// Require `$`-variable declarations to be placed first in a block (root or a rule
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-first-in-block/README.md
		'scss/dollar-variable-first-in-block': [true, {
			ignore: ['comments', 'imports'],
		}],

		// Disallow Sass variables that are used without interpolation with CSS features that use custom identifiers
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-no-missing-interpolation/README.md
		'scss/dollar-variable-no-missing-interpolation': true,

		// Disallow assignment to namespaced variables
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-no-namespaced-assignment/README.md
		'scss/dollar-variable-no-namespaced-assignment': true,

		// Specify a pattern for Sass-like variables
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-pattern/README.md
		'scss/dollar-variable-pattern': /^(?:-{1,2}|_)?([a-z][\da-z]*)(-{1,2}[\da-z]+)*$/, // eslint-disable-line unicorn/no-unsafe-regex

		// Specify a pattern for `%`-placeholders
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/percent-placeholder-pattern/README.md
		'scss/percent-placeholder-pattern': KEBAB_CASE,

		// Require or disallow an empty line before `//`-comments
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-empty-line-before/README.md
		// Note: it depends
		'scss/double-slash-comment-empty-line-before': null,

		// Require or disallow `//`-comments to be inline comments
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-inline/README.md
		// Note: it depends
		'scss/double-slash-comment-inline': null,

		// Require or disallow whitespace after the `//` in `//`-comments
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-whitespace-inside/README.md
		'scss/double-slash-comment-whitespace-inside': 'always',

		// Disallow nesting a single block if it could be merged with its parent block
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/block-no-redundant-nesting/README.md
		// Note: Potentially may break the BEM block declaration with a single element / modifier
		'scss/block-no-redundant-nesting': null,

		// Disallow empty comments
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/comment-no-empty/README.md
		'comment-no-empty': null,
		'scss/comment-no-empty': true,

		// Disallow `/*`-comments
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/comment-no-loud/README.md
		// Note: it depends
		'scss/comment-no-loud': null,

		// Require or disallow properties with - in their names to be in a form of a nested group
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/declaration-nested-properties/README.md
		// Note: Jesus Christ who ever use it
		'scss/declaration-nested-properties': 'never',

		// Disallow nested properties of the same "namespace" be divided into multiple groups
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/declaration-nested-properties-no-divided-groups/README.md
		'scss/declaration-nested-properties-no-divided-groups': null,

		// Interpolating a value with a unit (e.g. #{$value}px) results in a string value, not as numeric value
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dimension-no-non-numeric-values/README.md
		'scss/dimension-no-non-numeric-values': true,

		// Disallow interpolation in calc(), clamp(), min(), and max() functions.
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-calculation-no-interpolation/README.md
		'scss/function-calculation-no-interpolation': true,

		// Encourage the use of the `scale-color`
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-color-relative/README.md
		// Note: don't think it's a good idea
		'scss/function-color-relative': null,

		// Specify a list of disallowed functions. Should be used instead of Stylelint's `function-disallowed-list`.
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-disallowed-list/README.md
		// Note: Should be configured individually per-project
		'function-disallowed-list': null,
		'scss/function-disallowed-list': null,

		// Disallow unknown functions
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-no-unknown/README.md
		// Note: setup to fit `more-sass` package
		'function-no-unknown': null,
		'scss/function-no-unknown': [true, {
			ignoreFunctions: ['shade', 'social-color', 'tint', 'column', 'offset', 'get-char'],
		}],

		// Disallow quoted strings inside the quote function (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-quote-no-quoted-strings-inside/README.md
		'+scss/function-quote-no-quoted-strings-inside': true,

		// Disallow unquoted strings inside the unquote function (autofixable)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-unquote-no-unquoted-strings-inside/README.md
		'+scss/function-unquote-no-unquoted-strings-inside': true,

		// Require quoted keys in Sass maps
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/map-keys-quotes/README.md
		'scss/map-keys-quotes': null, // Do we need it actually?

		// Require a media feature value be a `$`-variable or disallow `$`-variables in media feature values
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/media-feature-value-dollar-variable/README.md
		// Note: it depends
		'scss/media-feature-value-dollar-variable': null,

		// Disallow linebreaks after Sass operators
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-newline-after/README.md
		'scss/operator-no-newline-after': null,

		// Disallow linebreaks before Sass operators
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-newline-before/README.md
		'scss/operator-no-newline-before': null,

		// Disallow unspaced operators in Sass operations
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-unspaced/README.md
		'scss/operator-no-unspaced': true,

		// Disallow non-CSS `@imports` in partial files
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/partial-no-import/README.md
		'scss/partial-no-import': null,

		// Disallow unknown properties, including nested properties.
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/property-no-unknown/README.md
		'property-no-unknown': null,
		'scss/property-no-unknown': true,

		// Require or disallow nesting of combinators in selectors
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-nest-combinators/README.md
		'scss/selector-nest-combinators': null,

		// Disallow redundant nesting selectors (`&`)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-redundant-nesting-selector/README.md
		'scss/selector-no-redundant-nesting-selector': true,

		// Disallow union class names with the parent selector (`&`)
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-union-class-name/README.md
		// Note: breaks BEM
		'scss/selector-no-union-class-name': null,

		// Disallow dollar variables within a stylesheet
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-dollar-variables/README.md
		'scss/no-dollar-variables': null,

		// Disallow duplicate dollar variables within a stylesheet
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-duplicate-dollar-variables/README.md
		// Note: well, usually it's intended
		'scss/no-duplicate-dollar-variables': null,

		// Disallow duplicate mixins within a stylesheet
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-duplicate-mixins/README.md
		'scss/no-duplicate-mixins': true,

		// Disallows the use of global function names, as these global functions are now located inside built-in Sass modules
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md
		'scss/no-global-function-names': true,
	},
};
