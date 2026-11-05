import { scssBaseConfig } from '~configurations/scss/base';
import { morevSass, pluginScss, pluginUseNesting } from '~configurations/scss/plugins';
import { CSS_RULES } from './css';

const SCSS_RULES = {
	...CSS_RULES,
	...scssBaseConfig.rules,
	...morevSass.rules,
	...pluginScss.rules,
	...pluginUseNesting.rules,
} as const;

export { SCSS_RULES };
