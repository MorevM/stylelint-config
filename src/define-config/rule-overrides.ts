import { isFunction } from '@morev/utils';
import { RuleBuilder } from './rule-builder';
import { CSS_RULES, SCSS_RULES } from './rules';
import type { Config } from 'stylelint';
import type {
	DefineConfigPreset,
	DefineConfigRuleName,
	DefineConfigRulesDiagnostics,
	DefineConfigRulesFactoryOptions,
	DefineConfigRulesOptions,
} from './types';

type RuleSetting = NonNullable<Config['rules']>[string];

const RULES_BY_PRESET = {
	css: CSS_RULES,
	scss: SCSS_RULES,
} as const;

const getPresetRules = <Preset extends DefineConfigPreset>(preset: Preset) =>
	RULES_BY_PRESET[preset] as Record<DefineConfigRuleName<Preset>, unknown>;

const isRuleName = <Preset extends DefineConfigPreset>(
	preset: Preset,
	ruleName: string,
): ruleName is DefineConfigRuleName<Preset> =>
	ruleName in getPresetRules(preset);

const resolveRuleBuilderValue = (
	ruleName: string,
	defaultValue: unknown,
	value: unknown,
	diagnostics: DefineConfigRulesDiagnostics,
) => {
	if (!isFunction(value)) return value as RuleSetting;

	const rule = new RuleBuilder(ruleName, defaultValue, diagnostics);
	const resolveRule = value as unknown as (rule: RuleBuilder) => RuleBuilder | void;
	const resolvedValue = resolveRule(rule);

	return resolvedValue instanceof RuleBuilder
		? resolvedValue.toRuleSetting()
		: rule.toRuleSetting();
};

const resolveRuleValue = <
	Preset extends DefineConfigPreset,
	RuleName extends DefineConfigRuleName<Preset>,
>(
	preset: Preset,
	ruleName: RuleName,
	value: unknown,
	diagnostics: DefineConfigRulesDiagnostics,
) => {
	if (!isFunction(value)) return value as RuleSetting;

	return resolveRuleBuilderValue(
		ruleName,
		getPresetRules(preset)[ruleName],
		value,
		diagnostics,
	);
};

const resolveRules = <Preset extends DefineConfigPreset>(
	preset: Preset,
	diagnostics: DefineConfigRulesDiagnostics,
	rules: DefineConfigRulesOptions<Preset>,
) => {
	const resolvedRules: NonNullable<Config['rules']> = {};
	const runtimeRules = rules as Partial<Record<string, unknown>>;

	for (const ruleName of Object.keys(rules)) {
		if (!isRuleName(preset, ruleName)) continue;

		const value = runtimeRules[ruleName];
		if (value === undefined) continue;

		resolvedRules[ruleName] = resolveRuleValue(preset, ruleName, value, diagnostics);
	}

	return resolvedRules;
};

const createRulesConfig = (options: DefineConfigRulesFactoryOptions): Config => {
	if (!options.rules) return {};

	const preset = options.preset ?? 'scss';

	return {
		rules: resolveRules(preset, options.rulesDiagnostics ?? 'warn', options.rules),
	};
};

export {
	createRulesConfig,
	resolveRuleBuilderValue,
};
