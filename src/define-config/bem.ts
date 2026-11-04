import morevStylelintPlugin, { createDefineRules } from '@morev/stylelint-plugin';
import { isString, isUndefined } from '@morev/utils';
import { resolveRuleBuilderValue } from './rule-overrides';
import { DEFAULT_BEM_RULES } from './rules';
import type { Config } from 'stylelint';
import type {
	DefineConfigBemOptions,
	DefineConfigBemPluginRules,
	DefineConfigBemRulesFactoryOptions,
	DefineConfigBemRulesOptions,
	DefineConfigBemRuleValue,
	DefineConfigDefaultBemRuleName,
	DefineConfigRulesDiagnostics,
} from './types';

/**
 * Resolves a user override for a default BEM rule.
 *
 * @param   ruleName      BEM rule name with a built-in default value.
 * @param   value         Direct rule value or callback override.
 * @param   diagnostics   Redundant setter diagnostics mode.
 *
 * @returns               Resolved rule value.
 */
const resolveBemRuleValue = <RuleName extends DefineConfigDefaultBemRuleName>(
	ruleName: RuleName,
	value: DefineConfigBemRuleValue<RuleName>,
	diagnostics: DefineConfigRulesDiagnostics,
) => {
	return resolveRuleBuilderValue(
		ruleName,
		DEFAULT_BEM_RULES[ruleName],
		value,
		diagnostics,
	);
};

/**
 * Checks whether a rule name has built-in BEM defaults.
 *
 * @param   ruleName   Rule name from user options.
 *
 * @returns            Whether the rule can receive callback helpers.
 */
const isDefaultBemRuleName = (ruleName: unknown): ruleName is DefineConfigDefaultBemRuleName =>
	isString(ruleName) && ruleName in DEFAULT_BEM_RULES;

/**
 * Resolves the final rule map from built-in BEM defaults and user overrides.
 *
 * @param   diagnostics   Redundant setter diagnostics mode.
 * @param   rules         User-provided BEM rule overrides.
 *
 * @returns               Rule map accepted by `@morev/stylelint-plugin`.
 */
const resolveBemRules = (
	diagnostics: DefineConfigRulesDiagnostics,
	rules: DefineConfigBemRulesOptions = {},
) => {
	const resolvedRules = { ...DEFAULT_BEM_RULES } as Record<string, unknown>;

	for (const [ruleName, value] of Object.entries(rules)) {
		if (isUndefined(value)) continue;

		resolvedRules[ruleName] = isDefaultBemRuleName(ruleName)
			? resolveBemRuleValue(ruleName, value as DefineConfigBemRuleValue<typeof ruleName>, diagnostics)
			: value;
	}

	return resolvedRules as DefineConfigBemPluginRules;
};

/**
 * Creates normalized BEM rule settings for a Stylelint config.
 *
 * @param   options   BEM rule factory options.
 *
 * @returns           Normalized Stylelint rule settings.
 */
const createBemRules = (options: DefineConfigBemRulesFactoryOptions = {}) => {
	const defineRules = createDefineRules({ separators: options.separators });

	return defineRules(resolveBemRules(options.rulesDiagnostics ?? 'warn', options.rules));
};

/**
 * Creates a Stylelint override that applies BEM rules only to configured files.
 *
 * @param   options   Public BEM options from `defineConfig`.
 *
 * @returns           Stylelint config fragment with a BEM override, or an empty fragment.
 */
const createBemConfig = (options: DefineConfigBemOptions | undefined): Config => {
	if (!options) return {};

	return {
		overrides: [
			{
				files: options.files,
				plugins: morevStylelintPlugin,
				rules: createBemRules(options),
			},
		],
	};
};

export {
	createBemConfig,
	createBemRules,
};
