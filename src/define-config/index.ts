import { mergeStylelintConfigs } from '#utils';
import { createBemConfig } from './bem';
import { createOrderConfig } from './order';
import { createPresetConfig } from './preset';
import { createRulesConfig } from './rule-overrides';
import type { PlainObject } from '@morev/utils';
import type {
	DefineConfigBemOptions,
	DefineConfigCssPresetFactoryOptions,
	DefineConfigFlatConfig,
	DefineConfigInputConfig,
	DefineConfigPreset,
	DefineConfigPresetName,
	DefineConfigScssPresetFactoryOptions,
	DefineConfigStylelintConfig,
} from './types';

/**
 * Checks whether a config part is a flat Stylelint item scoped to files.
 *
 * @param   config   Public Stylelint config part.
 *
 * @returns          Whether the config part should be lowered to `overrides`.
 */
const hasFiles = (
	config: DefineConfigFlatConfig,
): config is DefineConfigFlatConfig & Required<Pick<DefineConfigFlatConfig, 'files'>> =>
	config.files !== undefined;

/**
 * Converts one flat Stylelint item into a regular Stylelint config fragment.
 *
 * @param   config   Public Stylelint config part.
 *
 * @returns          Stylelint config fragment without a root-level `files` property.
 */
const normalizeFlatConfig = (config: DefineConfigFlatConfig): DefineConfigInputConfig => {
	if (!hasFiles(config)) return config;

	const { files, overrides, ...overrideConfig } = config;

	return {
		overrides: [
			{
				files,
				...overrideConfig,
			},
			...(overrides ?? []),
		],
	};
};

/**
 * Creates a CSS or SCSS preset config item.
 *
 * @param   preset    Base package preset.
 * @param   options   Preset factory options.
 *
 * @returns           Flat Stylelint config item accepted by `defineConfig`.
 */
const createSyntaxPresetConfig = (
	preset: DefineConfigPreset,
	options: DefineConfigCssPresetFactoryOptions | DefineConfigScssPresetFactoryOptions = {},
) => {
	const { files, ...factoryOptions } = options;
	const config = mergeStylelintConfigs(
		createPresetConfig({ preset }),
		createOrderConfig(factoryOptions),
		createRulesConfig({ ...factoryOptions, preset }),
	) as DefineConfigFlatConfig;

	if (files !== undefined) config.files = files;

	return config;
};

/**
 * Creates a flat Stylelint config from regular Stylelint config parts.
 *
 * @param   configs   Regular Stylelint config parts, optionally scoped with root-level `files`.
 *
 * @returns           Merged Stylelint configuration.
 */
const defineConfig = (...configs: DefineConfigFlatConfig[]): DefineConfigStylelintConfig =>
	configs.reduce<PlainObject>(
		(mergedConfig, config) => mergeStylelintConfigs(
			mergedConfig,
			normalizeFlatConfig(config) as PlainObject,
		),
		// Stylelint validates root rules before applying file overrides.
		{ rules: {} },
	) as DefineConfigStylelintConfig;

function definePreset(preset: 'css', options?: DefineConfigCssPresetFactoryOptions): DefineConfigFlatConfig;
function definePreset(preset: 'scss', options?: DefineConfigScssPresetFactoryOptions): DefineConfigFlatConfig;
function definePreset(preset: 'bem', options: DefineConfigBemOptions): DefineConfigFlatConfig;
/**
 * Creates a flat Stylelint config item with typed rule callbacks.
 *
 * @param   preset    Package preset name.
 * @param   options   Preset options.
 *
 * @returns           Flat Stylelint config item accepted by `defineConfig`.
 */
function definePreset(
	preset: DefineConfigPresetName,
	options?: DefineConfigBemOptions | DefineConfigCssPresetFactoryOptions | DefineConfigScssPresetFactoryOptions,
): DefineConfigFlatConfig {
	if (preset === 'css') {
		return createSyntaxPresetConfig(preset, options as DefineConfigCssPresetFactoryOptions | undefined);
	}

	if (preset === 'scss') {
		return createSyntaxPresetConfig(preset, options as DefineConfigScssPresetFactoryOptions | undefined);
	}

	if (preset === 'bem') {
		return createBemConfig(options as DefineConfigBemOptions) as DefineConfigFlatConfig;
	}

	const exhaustivePreset: never = preset;
	return exhaustivePreset;
}

export {
	defineConfig,
	definePreset,
	type DefineConfigBemOptions,
	type DefineConfigCssPresetFactoryOptions,
	type DefineConfigFlatConfig,
	type DefineConfigPreset,
	type DefineConfigPresetName,
	type DefineConfigScssPresetFactoryOptions,
	type DefineConfigStylelintConfig,
};
