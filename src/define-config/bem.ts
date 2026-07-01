import { createDefineRules } from '@morev/stylelint-plugin';
import { isFunction, isString, mergeObjects } from '@morev/utils';
import { DEFAULT_BEM_RULES } from './bem-defaults';
import type { PlainObject } from '@morev/utils';
import type { Config } from 'stylelint';
import type {
	DefineConfigBemOptions,
	DefineConfigBemPluginRules,
	DefineConfigBemRuleContext,
	DefineConfigBemRuleSettingWithOptions,
	DefineConfigBemRulesFactoryOptions,
	DefineConfigBemRulesOptions,
	DefineConfigBemRuleValue,
	DefineConfigDefaultBemRuleName,
} from './types';

/**
 * Reads secondary options from a default BEM rule.
 *
 * @param   ruleName   BEM rule name with a built-in default value.
 *
 * @returns            Secondary options for the rule.
 */
const getRuleSecondaryOptions = <RuleName extends DefineConfigDefaultBemRuleName>(
	ruleName: RuleName,
) => {
	const rule = DEFAULT_BEM_RULES[ruleName];
	const secondaryOptions = rule[1] ?? {};

	return secondaryOptions as PlainObject;
};

/**
 * Creates callback helpers for a default BEM rule override.
 *
 * @param   ruleName   BEM rule name with a built-in default value.
 *
 * @returns            Callback context with the default value and bound merge helper.
 */
const createRuleContext = <RuleName extends DefineConfigDefaultBemRuleName>(
	ruleName: RuleName,
): DefineConfigBemRuleContext<RuleName> => {
	const defaultRule = DEFAULT_BEM_RULES[ruleName];

	return {
		/**
		 * Merges secondary options into this rule's default options.
		 *
		 * @param   options   Secondary options accepted by the current rule.
		 *
		 * @returns           Rule setting with merged secondary options.
		 */
		merge: (options) => {
			const [primary] = defaultRule;
			const secondaryOptions = mergeObjects(
				getRuleSecondaryOptions(ruleName),
				options as PlainObject,
			);

			return [primary, secondaryOptions] as DefineConfigBemRuleSettingWithOptions<RuleName>;
		},
		value: defaultRule,
	};
};

/**
 * Resolves a user override for a default BEM rule.
 *
 * @param   ruleName   BEM rule name with a built-in default value.
 * @param   value      Direct rule value or callback override.
 *
 * @returns            Resolved rule value.
 */
const resolveBemRuleValue = <RuleName extends DefineConfigDefaultBemRuleName>(
	ruleName: RuleName,
	value: DefineConfigBemRuleValue<RuleName>,
) => {
	if (!isFunction(value)) return value;

	return value(createRuleContext(ruleName));
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
 * @param   rules   User-provided BEM rule overrides.
 *
 * @returns         Rule map accepted by `@morev/stylelint-plugin`.
 */
const resolveBemRules = (rules: DefineConfigBemRulesOptions = {}) => {
	const resolvedRules = { ...DEFAULT_BEM_RULES } as Record<string, unknown>;

	for (const ruleName of Object.keys(rules)) {
		const value = rules[ruleName];
		if (value === undefined) continue;

		resolvedRules[ruleName] = isDefaultBemRuleName(ruleName)
			? resolveBemRuleValue(ruleName, value as DefineConfigBemRuleValue<typeof ruleName>)
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

	return defineRules(resolveBemRules(options.rules));
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
				plugins: ['@morev/stylelint-plugin'],
				rules: createBemRules(options),
			},
		],
	};
};

export {
	createBemConfig,
	createBemRules,
};
