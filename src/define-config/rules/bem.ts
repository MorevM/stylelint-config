/**
 * Default `@morev/stylelint-plugin` BEM rules used by `defineConfig`.
 */
const DEFAULT_BEM_RULES = {
	// Requires the component's root selector to define a variable referencing the block name.
	// https://morevm.github.io/stylelint-plugin/rules/bem/block-variable.html
	'@morev/bem/block-variable': [true, {
		name: 'b',
		interpolation: 'always',
		firstChild: true,
		replaceBlockName: true,
	}],

	// Enforces naming patterns for BEM entities.
	// https://morevm.github.io/stylelint-plugin/rules/bem/selector-pattern.html
	'@morev/bem/selector-pattern': [true, {
		ignoreBlocks: [],
		patterns: {
			block: 'KEBAB_CASE',
			element: 'KEBAB_CASE_NUMERIC',
			modifierName: 'KEBAB_CASE',
			modifierValue: 'KEBAB_CASE_NUMERIC',
		},
	}],

	// Requires the file name to begin with the name of the BEM block it represents.
	// https://morevm.github.io/stylelint-plugin/rules/bem/match-file-name.html
	'@morev/bem/match-file-name': [true, {
		caseSensitive: true,
		matchDirectory: false,
	}],

	// Disallows splitting BEM entities across multiple chained `&` selectors in SCSS.
	// https://morevm.github.io/stylelint-plugin/rules/bem/no-chained-entities.html
	'@morev/bem/no-chained-entities': [true, {
		disallowNestedModifierValues: false,
	}],

	// Requires extensions of a BEM entity selector to be declared within that entity.
	// https://morevm.github.io/stylelint-plugin/rules/bem/no-detached-entity-extensions.html
	'@morev/bem/no-detached-entity-extensions': true,

	// Prevents BEM entities from having both grouped and separate declarations.
	// https://morevm.github.io/stylelint-plugin/rules/bem/no-grouped-entities.html
	'@morev/bem/no-grouped-entities': [true, {
		strict: false,
	}],

	// Prevents layout-affecting CSS properties within BEM block selectors.
	// https://morevm.github.io/stylelint-plugin/rules/bem/no-block-properties.html
	'@morev/bem/no-block-properties': [true, {
		presets: ['EXTERNAL_GEOMETRY', 'CONTEXT_DEPENDENT', 'POSITIONING'],
		allowProperties: [],
		ignoreBlocks: [],
	}],

	// Disallows selectors that apply styles outside the scope of the current BEM block.
	// https://morevm.github.io/stylelint-plugin/rules/bem/no-side-effects.html
	'@morev/bem/no-side-effects': [true, {
		ignore: [],
	}],
} as const;

export { DEFAULT_BEM_RULES };
