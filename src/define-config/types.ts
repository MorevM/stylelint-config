import type { createDefineRules } from '@morev/stylelint-plugin';
import type { Config } from 'stylelint';
import type {
	RulesOrderGroups as OrderGroups,
	RuleOrderItem as OrderItem,
} from '#shared';
import type { DEFAULT_BEM_RULES } from './bem-defaults';

/**
 * Name of any built-in order group.
 */
type OrderGroupName = keyof OrderGroups;

/**
 * Order group names exposed for user customization.
 */
type ConfigurableOrderGroupName = 'blockMixins' | 'containerQueries' | 'mediaQueries' | 'mixins';

/**
 * Deeply removes readonly modifiers from literal order-group values.
 */
type Mutable<T> =
	T extends RegExp
		? T
		: T extends readonly unknown[]
			? { -readonly [Key in keyof T]: Mutable<T[Key]> }
			: T extends object
				? { -readonly [Key in keyof T]: Mutable<T[Key]> }
				: T;

/**
 * Single user-provided order matcher or shortcut.
 */
type OrderGroupInputItem = OrderItem | string;

/**
 * User-provided replacement values for a configurable order group.
 */
type OrderGroupInput = OrderGroupInputItem[];

/**
 * Mutable default group values exposed to a group callback.
 */
type OrderGroupCallbackValues<GroupName extends ConfigurableOrderGroupName> =
	Mutable<OrderGroups[GroupName]>;

/**
 * Direct replacement values or a callback for transforming default group values.
 */
type OrderGroupConfigValue<GroupName extends ConfigurableOrderGroupName> =
	| OrderGroupInput
	| ((configValues: OrderGroupCallbackValues<GroupName>) => OrderGroupInput | void);

/**
 * Runtime form used after configurable group names are narrowed dynamically.
 */
type RuntimeOrderGroupConfigValue =
	| OrderGroupInput
	| ((configValues: OrderItem[]) => OrderGroupInput | void);

/**
 * Global options accepted by `@morev/stylelint-plugin` rule helpers.
 */
type DefineConfigBemPluginGlobals = Parameters<typeof createDefineRules>[0];

/**
 * Rule schema accepted by `@morev/stylelint-plugin`.
 */
type DefineConfigBemPluginRules = Parameters<ReturnType<typeof createDefineRules>>[0];

/**
 * Names of BEM rules provided by `@morev/stylelint-plugin`.
 */
type DefineConfigBemRuleName = Extract<keyof DefineConfigBemPluginRules, `@morev/bem/${string}`>;

/**
 * Names of BEM rules with built-in defaults in this config package.
 */
type DefineConfigDefaultBemRuleName = Extract<DefineConfigBemRuleName, keyof typeof DEFAULT_BEM_RULES>;

/**
 * Full config value accepted by a single `@morev/stylelint-plugin` BEM rule.
 */
type DefineConfigBemRuleSetting<RuleName extends DefineConfigBemRuleName> =
	Exclude<Required<DefineConfigBemPluginRules>[RuleName], undefined>;

/**
 * Rule value tuple that includes secondary options.
 */
type DefineConfigBemRuleSettingWithOptions<RuleName extends DefineConfigBemRuleName> =
	Extract<DefineConfigBemRuleSetting<RuleName>, [unknown, object]>;

/**
 * Secondary options accepted by a single BEM rule.
 */
type DefineConfigBemRuleSecondaryOptions<RuleName extends DefineConfigBemRuleName> =
	DefineConfigBemRuleSettingWithOptions<RuleName> extends [unknown, infer Options]
		? Options
		: never;

/**
 * Deeply readonly version of values exposed to user callbacks.
 */
type DeepReadonly<T> =
	T extends RegExp
		? T
		: T extends (...args: never[]) => unknown
			? T
			: T extends readonly unknown[]
				? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
				: T extends object
					? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
					: T;

/**
 * Readonly rule setting exposed to callbacks.
 */
type ReadonlyRuleSetting<T> =
	T extends [infer Primary, infer Secondary]
		? readonly [DeepReadonly<Primary>, DeepReadonly<Secondary>]
		: T extends [infer Primary]
			? readonly [DeepReadonly<Primary>]
			: DeepReadonly<T>;

/**
 * Callback helper for a default BEM rule.
 */
type DefineConfigBemRuleContext<RuleName extends DefineConfigDefaultBemRuleName> = {
	/**
	 * Merges the provided secondary rule options into this rule's default options.
	 */
	merge: (
		options: DefineConfigBemRuleSecondaryOptions<RuleName>,
	) => DefineConfigBemRuleSettingWithOptions<RuleName>;
	/**
	 * Readonly built-in rule value before user overrides.
	 */
	value: (typeof DEFAULT_BEM_RULES)[RuleName];
};

/**
 * User-provided value for a BEM rule with built-in defaults.
 */
type DefineConfigBemRuleValue<RuleName extends DefineConfigDefaultBemRuleName> =
	| DefineConfigBemRuleSetting<RuleName>
	| ReadonlyRuleSetting<DefineConfigBemRuleSetting<RuleName>>
	| ((
		rule: DefineConfigBemRuleContext<RuleName>,
	) => DefineConfigBemRuleSetting<RuleName> | ReadonlyRuleSetting<DefineConfigBemRuleSetting<RuleName>>);

/**
 * BEM rule overrides accepted by `defineConfig`.
 */
type DefineConfigBemRulesOptions = Partial<{
	[RuleName in DefineConfigDefaultBemRuleName]: DefineConfigBemRuleValue<RuleName>;
}> & {
	/**
	 * Additional Stylelint rules that should be added to the same BEM override.
	 */
	[ruleName: string]: unknown;
};

/**
 * Options used to create BEM rules without wrapping them into a Stylelint override.
 */
type DefineConfigBemRulesFactoryOptions = {
	/**
	 * Rule overrides merged over the built-in BEM defaults.
	 */
	rules?: DefineConfigBemRulesOptions;
	/**
	 * BEM separators shared between every BEM rule from `@morev/stylelint-plugin`.
	 */
	separators?: DefineConfigBemPluginGlobals['separators'];
};

/**
 * BEM options accepted by `defineConfig`.
 */
type DefineConfigBemOptions = DefineConfigBemRulesFactoryOptions & {
	/**
	 * Component file globs that should receive BEM-only rules.
	 */
	files: string | string[];
};

/**
 * Built-in preset selected by `defineConfig`.
 */
type DefineConfigPreset = 'css' | 'scss';

/**
 * Optional overrides for public order groups.
 */
type DefineConfigOrderOptions = Partial<{
	[GroupName in ConfigurableOrderGroupName]: OrderGroupConfigValue<GroupName>;
}>;

/**
 * Options consumed by the order config factory.
 */
type DefineConfigOrderFactoryOptions = {
	/**
	 * Order group overrides merged into the generated `order/order` rule.
	 */
	order?: DefineConfigOrderOptions;
};

/**
 * Options consumed by the preset config factory.
 */
type DefineConfigPresetOptions = {
	/**
	 * Base package preset extended by the generated config.
	 */
	preset?: DefineConfigPreset;
};

/**
 * Options shared by root and target-local `defineConfig` branches.
 */
type DefineConfigBaseOptions = {
	/**
	 * BEM rules scoped to component files.
	 */
	bem?: DefineConfigBemOptions;
	/**
	 * Order group overrides merged into the generated `order/order` rule.
	 */
	order?: DefineConfigOrderOptions;
};

/**
 * Options accepted by one scoped `defineConfig` target.
 */
type DefineConfigTargetOptions = DefineConfigBaseOptions & {
	/**
	 * Style files that should receive this target config.
	 */
	files: string | string[];
	/**
	 * Base package preset extended by the generated config.
	 */
	preset?: DefineConfigPreset;
};

/**
 * Options accepted by `defineConfig` for a single-preset project.
 */
type DefineConfigSinglePresetOptions = DefineConfigBaseOptions & {
	/**
	 * Base package preset extended by the generated config.
	 */
	preset?: DefineConfigPreset;
	/**
	 * Scoped preset branches for mixed projects.
	 */
	targets?: never;
};

/**
 * Options accepted by `defineConfig` for a mixed project.
 */
type DefineConfigTargetsOptions = DefineConfigBaseOptions & {
	/**
	 * Scoped preset branches for mixed projects.
	 */
	targets: DefineConfigTargetOptions[];
	/**
	 * Single-project preset selection is mutually exclusive with targets.
	 */
	preset?: never;
};

/**
 * Stylelint override shape used by generated target configs.
 */
type DefineConfigStylelintOverride = NonNullable<Config['overrides']>[number];

/**
 * Options accepted by `defineConfig`.
 */
type DefineConfigOptions = DefineConfigSinglePresetOptions | DefineConfigTargetsOptions;

export type {
	ConfigurableOrderGroupName,
	DeepReadonly,
	DefineConfigBaseOptions,
	DefineConfigBemOptions,
	DefineConfigBemPluginRules,
	DefineConfigBemRuleContext,
	DefineConfigBemRuleName,
	DefineConfigBemRuleSecondaryOptions,
	DefineConfigBemRuleSetting,
	DefineConfigBemRuleSettingWithOptions,
	DefineConfigBemRulesFactoryOptions,
	DefineConfigBemRulesOptions,
	DefineConfigBemRuleValue,
	DefineConfigDefaultBemRuleName,
	DefineConfigOptions,
	DefineConfigOrderFactoryOptions,
	DefineConfigOrderOptions,
	DefineConfigPreset,
	DefineConfigPresetOptions,
	DefineConfigSinglePresetOptions,
	DefineConfigStylelintOverride,
	DefineConfigTargetOptions,
	DefineConfigTargetsOptions,
	Mutable,
	OrderGroupInput,
	OrderGroupInputItem,
	OrderGroupName,
	ReadonlyRuleSetting,
	RuntimeOrderGroupConfigValue,
};
