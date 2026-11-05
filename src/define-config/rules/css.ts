import {
	morevStylelintPlugin,
	pluginDeclarationBlockNoIgnoredProperties,
	pluginHighPerformanceAnimation,
	pluginNoNestedMedia,
	pluginOrder,
	pluginSelectorNoEmpty,
	pluginSelectorTagNoWithoutClass,
	pluginStylistic,
} from '~configurations/css/plugins';
import { stylelintAvoidErrors, stylelintEnforceConventions } from '~configurations/css/rules';

const CSS_RULES = {
	...stylelintAvoidErrors.rules,
	...stylelintEnforceConventions.rules,
	...pluginDeclarationBlockNoIgnoredProperties.rules,
	...pluginHighPerformanceAnimation.rules,
	...pluginNoNestedMedia.rules,
	...pluginOrder.rules,
	...pluginSelectorNoEmpty.rules,
	...pluginSelectorTagNoWithoutClass.rules,
	...pluginStylistic.rules,
	...morevStylelintPlugin.rules,
} as const;

export { CSS_RULES };
