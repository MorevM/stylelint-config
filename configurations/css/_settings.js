import {
	stylelintAvoidErrors,
	stylelintEnforceConventions,
} from './rules/_index.js';

import {
	pluginDeclarationBlockNoIgnoredProperties,
	pluginHighPerformanceAnimation,
	pluginNoNestedMedia,
	pluginOrder,
	pluginSelectorNoEmpty,
	// pluginSelectorTagNoWithoutClass,  // No Stylelint v16 support
	pluginStylistic,
} from './plugins/_index.js';

export const parts = [
	stylelintAvoidErrors,
	stylelintEnforceConventions,
	//
	pluginDeclarationBlockNoIgnoredProperties,
	pluginHighPerformanceAnimation,
	pluginNoNestedMedia,
	pluginOrder,
	pluginSelectorNoEmpty,
	// pluginSelectorTagNoWithoutClass,  // No Stylelint v16 support
	pluginStylistic,
];
