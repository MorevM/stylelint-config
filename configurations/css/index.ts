import { processExports } from '../../utils/helpers.js';
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

const base = {
	languageOptions: {
		directionality: {
			block: 'top-to-bottom',
			inline: 'left-to-right',
		},
	},
};

const parts = [
	stylelintAvoidErrors,
	stylelintEnforceConventions,
	pluginDeclarationBlockNoIgnoredProperties,
	pluginHighPerformanceAnimation,
	pluginNoNestedMedia,
	pluginOrder,
	pluginSelectorNoEmpty,
	pluginSelectorTagNoWithoutClass,
	pluginStylistic,
];

export default processExports({ base, parts });
