import { processExports } from '#utils';
import { scssBaseConfig } from './base';
import {
	morevSass,
	pluginScss,
	pluginStylistic,
	pluginUseNesting,
} from './plugins';

export default processExports(
	scssBaseConfig,
	morevSass,
	pluginScss,
	pluginStylistic,
	pluginUseNesting,
);
