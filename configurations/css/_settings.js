import {
	pluginDeclarationBlockNoIgnoredProperties,
	pluginHighPerformanceAnimation,
	pluginNoNestedMedia,
	pluginOrder,
	pluginSelectorNoEmpty,
	pluginSelectorTagNoWithoutClass,
	pluginStylistic,
} from './plugins/_index.js';

import {
	stylelintAvoidErrors,
	stylelintEnforceConventions,
} from './rules/_index.js';

export const parts = [
	stylelintAvoidErrors,
	stylelintEnforceConventions,
	//
	pluginDeclarationBlockNoIgnoredProperties,
	pluginHighPerformanceAnimation,
	pluginNoNestedMedia,
	pluginOrder,
	pluginSelectorNoEmpty,
	pluginSelectorTagNoWithoutClass,
	pluginStylistic,
];
