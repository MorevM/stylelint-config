import {
	// pluginAtRuleNoChildren,
	pluginScss,
	pluginUseNesting,
} from './plugins/_index.js';

export const base = {
	customSyntax: `import('postcss-scss')`,
	rules: {
		'declaration-property-value-no-unknown': null,
		'media-query-no-invalid': null,
		'no-descending-specificity': null,
		'no-duplicate-selectors': null,
		'no-invalid-position-at-import-rule': null,
	},
};

export const parts = [
	// pluginAtRuleNoChildren,
	pluginScss,
	pluginUseNesting,
];
