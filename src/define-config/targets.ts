import { mergeStylelintConfigs } from '#utils';
import { createBemConfig } from './bem';
import { createOrderConfig } from './order';
import { createPresetConfig } from './preset';
import type { PlainObject } from '@morev/utils';
import type { Config } from 'stylelint';
import type { DefineConfigStylelintOverride, DefineConfigTargetOptions } from './types';

/**
 * Creates the main Stylelint override for one target.
 *
 * @param   target   Public target options.
 *
 * @returns          Stylelint override scoped to the target files.
 */
const createTargetOverride = (target: DefineConfigTargetOptions): DefineConfigStylelintOverride => {
	const { files, ...options } = target;

	return {
		files,
		...mergeStylelintConfigs(
			createPresetConfig(options) as PlainObject,
			createOrderConfig(options) as PlainObject,
		),
	} as DefineConfigStylelintOverride;
};

/**
 * Creates Stylelint overrides for one target and its optional BEM branch.
 *
 * @param   target   Public target options.
 *
 * @returns          Stylelint overrides produced by this target.
 */
const createTargetOverrides = (target: DefineConfigTargetOptions): DefineConfigStylelintOverride[] => {
	const bemConfig = createBemConfig(target.bem);

	return [
		createTargetOverride(target),
		...(bemConfig.overrides ?? []),
	] as DefineConfigStylelintOverride[];
};

/**
 * Creates scoped Stylelint overrides for mixed-project targets.
 *
 * @param   targets   Public target options.
 *
 * @returns           Stylelint config fragment with target overrides.
 */
const createTargetsConfig = (targets: DefineConfigTargetOptions[] | undefined): Config => {
	if (!targets) return {};

	return {
		overrides: targets.flatMap((target) => createTargetOverrides(target)),
		rules: {},
	};
};

export { createTargetsConfig };
