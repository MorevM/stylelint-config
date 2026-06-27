import postcssScss from 'postcss-scss';

import {
	pluginAtRuleNoChildren,
	pluginScss,
	pluginUseNesting,
} from './plugins/_index.js';

export const base = {
	customSyntax: postcssScss,
	rules: {
		'declaration-property-value-no-unknown': null,
		'media-query-no-invalid': null,
		'no-descending-specificity': null,
		'no-invalid-position-at-import-rule': null,
		'selector-no-invalid': null,
	},
};

export const parts = [
	pluginAtRuleNoChildren,
	pluginScss,
	pluginUseNesting,
];
