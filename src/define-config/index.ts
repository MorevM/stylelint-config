import { mergeStylelintConfigs } from '#utils';
import { createBemConfig } from './bem';
import { createOrderConfig } from './order';
import { createPresetConfig } from './preset';
import type { PlainObject } from '@morev/utils';
import type { Config } from 'stylelint';
import type {
	DefineConfigBemOptions,
	DefineConfigOptions,
	DefineConfigOrderOptions,
	DefineConfigPreset,
} from './types';

/**
 * Creates a Stylelint configuration from package presets, order overrides, and extra config parts.
 *
 * @param   options       Options for preset selection and order overrides.
 * @param   configParts   Additional Stylelint config parts merged after generated values.
 *
 * @returns               Merged Stylelint configuration.
 */
const defineConfig = (options: DefineConfigOptions = {}, ...configParts: Config[]): Config =>
	mergeStylelintConfigs(
		createPresetConfig(options) as PlainObject,
		createOrderConfig(options) as PlainObject,
		createBemConfig(options.bem) as PlainObject,
		...configParts as PlainObject[],
	) as Config;

export {
	defineConfig,
	type DefineConfigBemOptions,
	type DefineConfigOptions,
	type DefineConfigOrderOptions,
	type DefineConfigPreset,
};
