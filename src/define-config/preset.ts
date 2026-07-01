import type { Config } from 'stylelint';
import type { DefineConfigOptions, DefineConfigPreset } from './types';

/**
 * Package subpath used by each preset value.
 */
const PRESET_EXTENDS: Record<DefineConfigPreset, string> = {
	css: '@morev/stylelint-config/css',
	scss: '@morev/stylelint-config',
};

/**
 * Creates the base config that extends the selected package preset.
 *
 * @param   options   Public define-config options.
 *
 * @returns           Stylelint config fragment with package preset extension.
 */
const createPresetConfig = (options: DefineConfigOptions): Config => ({
	extends: [PRESET_EXTENDS[options.preset ?? 'scss']],
});

export { createPresetConfig };
