import { processExports } from '#utils';
import { scssBaseConfig } from './base';
import {
	morevSass,
	pluginScss,
	pluginUseNesting,
} from './plugins';

export default processExports(
	scssBaseConfig,
	morevSass,
	pluginScss,
	pluginUseNesting,
);
