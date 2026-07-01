import { processExports } from '#utils';
import {
	pluginDeclarationBlockNoIgnoredProperties,
	pluginHighPerformanceAnimation,
	pluginNoNestedMedia,
	pluginOrder,
	pluginSelectorNoEmpty,
	pluginSelectorTagNoWithoutClass,
	pluginStylistic,
} from './plugins';
import { stylelintAvoidErrors, stylelintEnforceConventions } from './rules';

export default processExports(
	{
		languageOptions: {
			directionality: {
				block: 'top-to-bottom',
				inline: 'left-to-right',
			},
		},
	},
	stylelintAvoidErrors,
	stylelintEnforceConventions,
	pluginDeclarationBlockNoIgnoredProperties,
	pluginHighPerformanceAnimation,
	pluginNoNestedMedia,
	pluginOrder,
	pluginSelectorNoEmpty,
	pluginSelectorTagNoWithoutClass,
	pluginStylistic,
);
