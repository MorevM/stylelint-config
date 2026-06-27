import postcssScss from 'postcss-scss';

import { processExports } from '../../utils/helpers.js';
import {
	pluginAtRuleNoChildren,
	pluginScss,
	pluginUseNesting,
} from './plugins/_index.js';

const base = {
	customSyntax: postcssScss,
	rules: {
		'declaration-property-value-no-unknown': null,
		'media-query-no-invalid': null,
		'no-descending-specificity': null,
		'no-invalid-position-at-import-rule': null,
		'selector-no-invalid': null,
	},
};

const parts = [
	pluginAtRuleNoChildren,
	pluginScss,
	pluginUseNesting,
];

export default {
	extends: ['./css.js'],
	...processExports({ parts, base }),
};
