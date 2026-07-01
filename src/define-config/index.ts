import { mergeStylelintConfigs } from '#utils';
import { createBemConfig } from './bem';
import { createOrderConfig } from './order';
import { createPresetConfig } from './preset';
import { createTargetsConfig } from './targets';
import type { Config } from 'stylelint';
import type {
	DefineConfigBemOptions,
	DefineConfigOptions,
	DefineConfigOrderOptions,
	DefineConfigPreset,
	DefineConfigTargetOptions,
	DefineConfigTargetsOptions,
} from './types';

/**
 * Checks whether the config uses scoped mixed-project targets.
 *
 * @param   options   Public define-config options.
 *
 * @returns           Whether target generation is enabled.
 */
const hasTargets = (options: DefineConfigOptions): options is DefineConfigTargetsOptions =>
	'targets' in options && options.targets !== undefined;

/**
 * Checks whether the config explicitly selects a root preset.
 *
 * @param   options   Public define-config options.
 *
 * @returns           Whether root preset generation is enabled.
 */
const hasPreset = (options: DefineConfigOptions) =>
	'preset' in options && options.preset !== undefined;

/**
 * Creates a Stylelint configuration from package presets, targets, order overrides, and extra config parts.
 *
 * @param   options       Options for preset selection and order overrides.
 * @param   configParts   Additional Stylelint config parts merged after generated values.
 *
 * @returns               Merged Stylelint configuration.
 *
 * @throws                When root-level `preset` and `targets` are combined.
 */
const defineConfig = (options: DefineConfigOptions = {}, ...configParts: Config[]): Config => {
	if (hasTargets(options) && hasPreset(options)) {
		throw new Error('`preset` and `targets` options are mutually exclusive.');
	}

	const baseConfig = hasTargets(options)
		? createTargetsConfig(options.targets)
		: createPresetConfig(options);

	return mergeStylelintConfigs(
		baseConfig,
		createOrderConfig(options),
		createBemConfig(options.bem),
		...configParts,
	);
};

export {
	defineConfig,
	type DefineConfigBemOptions,
	type DefineConfigOptions,
	type DefineConfigOrderOptions,
	type DefineConfigPreset,
	type DefineConfigTargetOptions,
};
