import type { createDefineRules } from '@morev/stylelint-plugin';
import type { Config } from 'stylelint';
import type {
	RuleConfig,
	StylelintConfig,
	StyleLintRules as StylelintCoreRules,
	CustomRuleOptions as StylelintCustomRuleOptions,
	SecondaryOptions as StylelintSecondaryOptions,
} from 'stylelint-define-config';
import type {
	RulesOrderGroups as OrderGroups,
	RuleOrderItem as OrderItem,
} from '#shared';
import type { CSS_RULES, DEFAULT_BEM_RULES, SCSS_RULES } from './rules';

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
 * Widens literal default values while preserving object keys for editor completions.
 */
type Widen<T> =
	T extends RegExp
		? RegExp
		: T extends string
			? string
			: T extends number
				? number
				: T extends boolean
					? boolean
					: T extends readonly []
						? unknown[]
						: T extends ReadonlyArray<infer Item>
							? Array<Widen<Item>>
							: T extends object
								? { -readonly [Key in keyof T]: Widen<T[Key]> }
								: T;

/**
 * Expands inferred object types so editor completions can see their properties.
 */
type Simplify<T> = { [Key in keyof T]: T[Key] } & {};

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
 * Built-in syntax preset selected by `definePreset`.
 */
type DefineConfigPreset = 'css' | 'scss';

/**
 * Presets that expose typed rule builders.
 */
type DefineConfigRulePreset = DefineConfigPreset | 'bem';

/**
 * Preset names accepted by `definePreset`.
 */
type DefineConfigPresetName = DefineConfigRulePreset;

/**
 * Regular Stylelint config accepted and returned by `defineConfig`.
 */
type DefineConfigStylelintConfig = StylelintConfig;

/**
 * Regular Stylelint config accepted by `defineConfig`.
 */
type DefineConfigInputConfig = StylelintConfig | Config;

/**
 * Flat Stylelint config item accepted by `defineConfig`.
 */
type DefineConfigFlatConfig = DefineConfigInputConfig & {
	/**
	 * Style files that should receive this config item.
	 */
	files?: string | string[];
};

/**
 * Standard secondary options shared by Stylelint rules.
 */
type DefineConfigRuleSecondaryOptions = StylelintSecondaryOptions<unknown[]>;

/**
 * Redundant rule builder setter diagnostics mode.
 */
type DefineConfigRulesDiagnostics = 'off' | 'warn' | 'error';

/**
 * Backward-compatible CSS rule diagnostics alias.
 */
type DefineConfigCssRulesDiagnostics = DefineConfigRulesDiagnostics;

/**
 * Names of standard Stylelint secondary options hidden from rule callbacks.
 */
type DefineConfigStylelintSecondaryOptionName = keyof DefineConfigRuleSecondaryOptions;

/**
 * Rule schemas for CSS plugins that do not publish `stylelint-define-config` typings.
 */
type DefineConfigCssLocalPluginRules = {
	/**
	 * Disallow property values that are ignored due to another property value in the same rule.
	 *
	 * @see https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties#readme
	 */
	'plugin/declaration-block-no-ignored-properties': RuleConfig<true>;

	/**
	 * Disallow low-performance animation and transition properties.
	 *
	 * @see https://github.com/kristerkari/stylelint-high-performance-animation#readme
	 */
	'plugin/no-low-performance-animation-properties': RuleConfig<true, [], {
		ignore?: 'paint-properties';
		ignoreProperties?: string[];
	}>;

	/**
	 * Disallow nested media queries.
	 *
	 * @see https://github.com/tivac/stylelint-no-nested-media#readme
	 */
	'pitcher/no-nested-media': RuleConfig<true>;

	/**
	 * Disallow empty selector parts.
	 */
	'plugin/stylelint-selector-no-empty': RuleConfig<true>;

	/**
	 * Disallow configured tag selectors without a class qualifier.
	 *
	 * @see https://github.com/Moxio/stylelint-selector-tag-no-without-class#readme
	 */
	'plugin/selector-tag-no-without-class': RuleConfig<string | string[]>;
};

/**
 * Rule schemas for SCSS plugins that do not publish `stylelint-define-config` typings.
 */
type DefineConfigScssLocalPluginRules = {
	/**
	 * Enforce nesting when it is possible in CSS.
	 *
	 * @see https://github.com/csstools/stylelint-use-nesting#readme
	 */
	'csstools/use-nesting': RuleConfig<'always' | 'ignore' | true, [], {
		except?: Array<string | RegExp>;
		only?: Array<string | RegExp>;
		syntax?: 'css' | 'scss';
	}>;
};

/**
 * Global options accepted by `@morev/stylelint-plugin` rule helpers.
 */
type DefineConfigBemPluginGlobals = Parameters<typeof createDefineRules>[0];

/**
 * Rule schema accepted by `@morev/stylelint-plugin`.
 */
type DefineConfigBemPluginRules = NonNullable<Parameters<ReturnType<typeof createDefineRules>>[0]>;

/**
 * Rule schemas used as typed/JSDoc sources for the CSS preset.
 */
type DefineConfigCssRuleSources =
	& StylelintCoreRules
	& StylelintCustomRuleOptions
	& DefineConfigCssLocalPluginRules
	& DefineConfigBemPluginRules;

/**
 * Rule schemas used as typed/JSDoc sources for the SCSS preset.
 */
type DefineConfigScssRuleSources =
	& DefineConfigCssRuleSources
	& DefineConfigScssLocalPluginRules;

/**
 * Rule maps configured by each preset.
 */
type DefineConfigRulesByPreset = {
	bem: typeof DEFAULT_BEM_RULES;
	css: typeof CSS_RULES;
	scss: typeof SCSS_RULES;
};

/**
 * Rule schemas used as typed/JSDoc sources by each preset.
 */
type DefineConfigRuleSourcesByPreset = {
	bem: DefineConfigBemPluginRules;
	css: DefineConfigCssRuleSources;
	scss: DefineConfigScssRuleSources;
};

/**
 * Rule names configured by a preset.
 */
type DefineConfigRuleName<Preset extends DefineConfigRulePreset> =
	Extract<keyof DefineConfigRulesByPreset[Preset], string>;

/**
 * Rule names configured by the CSS preset.
 */
type DefineConfigCssRuleName = DefineConfigRuleName<'css'>;

/**
 * Rule names configured by the SCSS preset.
 */
type DefineConfigScssRuleName = DefineConfigRuleName<'scss'>;

/**
 * Full config value accepted by a configured rule.
 */
type DefineConfigRuleSetting<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	RuleName extends keyof DefineConfigRuleSourcesByPreset[Preset]
		? Exclude<Required<DefineConfigRuleSourcesByPreset[Preset]>[RuleName], undefined>
		: Config['rules'] extends Record<string, infer RuleSetting>
			? RuleSetting
			: never;

/**
 * Full config value accepted by a configured CSS rule.
 */
type DefineConfigCssRuleSetting<RuleName extends DefineConfigCssRuleName> =
	DefineConfigRuleSetting<'css', RuleName>;

/**
 * Full config value accepted by a configured SCSS rule.
 */
type DefineConfigScssRuleSetting<RuleName extends DefineConfigScssRuleName> =
	DefineConfigRuleSetting<'scss', RuleName>;

/**
 * Primary option accepted by one Stylelint rule setting.
 */
type DefineConfigRulePrimary<RuleSetting> =
	Exclude<RuleSetting, null | undefined> extends infer Value
		? Value extends unknown
			? Value extends readonly [infer Primary, object]
				? Primary
				: Value extends readonly [infer Primary]
					? Primary
					: Value
			: never
		: never;

/**
 * Secondary options accepted by one Stylelint rule setting.
 */
type DefineConfigRuleSecondary<RuleSetting> =
	Extract<
		Exclude<RuleSetting, null | undefined>,
		readonly [unknown, object]
	> extends readonly [unknown, infer Secondary]
		? Secondary
		: DefineConfigRuleSecondaryOptions;

/**
 * Removes broad index signatures that hide known secondary option names from editor completions.
 */
type RemoveIndexSignature<T> = {
	[Key in keyof T as
	string extends Key
		? never
		: number extends Key
			? never
			: symbol extends Key
				? never
				: Key
	]: T[Key];
};

/**
 * Rule-specific secondary options accepted by one Stylelint rule setting.
 */
type DefineConfigRuleSpecificSecondary<RuleSetting> =
	RemoveIndexSignature<
		Omit<DefineConfigRuleSecondary<RuleSetting>, DefineConfigStylelintSecondaryOptionName>
	> extends infer Secondary
		? keyof Secondary extends never
			? never
			: Secondary
		: never;

/**
 * Default value configured by this package for a rule.
 */
type DefineConfigRuleDefaultValue<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> = DefineConfigRulesByPreset[Preset][RuleName];

/**
 * Rule-specific secondary options currently present in this package's default rule value.
 */
type DefineConfigRuleDefaultSecondary<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	DefineConfigRuleDefaultValue<Preset, RuleName> extends readonly [unknown, infer Secondary]
		? Omit<Mutable<Secondary>, DefineConfigStylelintSecondaryOptionName> extends infer RuleSecondary
			? keyof RuleSecondary extends never
				? never
				: Widen<RuleSecondary>
			: never
		: never;

/**
 * Rule-specific secondary options available to the rule builder.
 */
type DefineConfigRuleAvailableSecondary<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	[DefineConfigRuleSpecificSecondary<DefineConfigRuleSetting<Preset, RuleName>>] extends [never]
		? DefineConfigRuleDefaultSecondary<Preset, RuleName>
		: DefineConfigRuleSpecificSecondary<DefineConfigRuleSetting<Preset, RuleName>>;

/**
 * Rule-specific secondary options accepted by builder replacement methods.
 */
type DefineConfigRuleReplacementSecondary<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	[DefineConfigRuleSpecificSecondary<DefineConfigRuleSetting<Preset, RuleName>>] extends [never]
		? [DefineConfigRuleDefaultSecondary<Preset, RuleName>] extends [never]
			? never
			: Partial<DefineConfigRuleDefaultSecondary<Preset, RuleName>>
		: DefineConfigRuleSpecificSecondary<DefineConfigRuleSetting<Preset, RuleName>>;

/**
 * Replacement secondary object accepted by `setSecondary`.
 */
type DefineConfigRuleSecondaryReplacement<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> = Simplify<DefineConfigRuleReplacementSecondary<Preset, RuleName>>;

/**
 * Normalized rule value accepted by the rule builder.
 */
type DefineConfigRuleValueTuple<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	[DefineConfigRuleAvailableSecondary<Preset, RuleName>] extends [never]
		? [DefineConfigRulePrimary<DefineConfigRuleSetting<Preset, RuleName>> | null]
		: | [DefineConfigRulePrimary<DefineConfigRuleSetting<Preset, RuleName>> | null]
			| [
				DefineConfigRulePrimary<DefineConfigRuleSetting<Preset, RuleName>> | null,
				DefineConfigRuleSecondaryReplacement<Preset, RuleName>,
			];

/**
 * Normalized CSS rule value accepted by the rule builder.
 */
type DefineConfigCssRuleValueTuple<RuleName extends DefineConfigCssRuleName> =
	DefineConfigRuleValueTuple<'css', RuleName>;

/**
 * Normalized SCSS rule value accepted by the rule builder.
 */
type DefineConfigScssRuleValueTuple<RuleName extends DefineConfigScssRuleName> =
	DefineConfigRuleValueTuple<'scss', RuleName>;

/**
 * Secondary options exposed through `rule.value`.
 */
type DefineConfigRuleCallbackSecondary<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	DefineConfigRuleAvailableSecondary<Preset, RuleName>
	& (
		DefineConfigRuleDefaultSecondary<Preset, RuleName> extends object
			? DefineConfigRuleDefaultSecondary<Preset, RuleName>
			: object
	);

/**
 * Callback used to transform current rule-specific secondary options.
 */
type DefineConfigRuleSecondaryCallback<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> = (
	secondary: DefineConfigRuleCallbackSecondary<Preset, RuleName>,
) => DefineConfigRuleSecondaryReplacement<Preset, RuleName> | void;

/**
 * Current rule value exposed to rule callbacks.
 */
type DefineConfigRuleCallbackValue<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	DefineConfigRuleDefaultValue<Preset, RuleName> extends null
		? [DefineConfigRulePrimary<DefineConfigRuleSetting<Preset, RuleName>> | null]
		: DefineConfigRuleDefaultValue<Preset, RuleName> extends readonly [unknown, object]
			? keyof DefineConfigRuleDefaultSecondary<Preset, RuleName> extends never
				? [
					DefineConfigRulePrimary<DefineConfigRuleSetting<Preset, RuleName>>
					| Extract<DefineConfigRuleDefaultValue<Preset, RuleName>[0], null>,
				]
				: [
					DefineConfigRulePrimary<DefineConfigRuleSetting<Preset, RuleName>>
					| Extract<DefineConfigRuleDefaultValue<Preset, RuleName>[0], null>,
					DefineConfigRuleCallbackSecondary<Preset, RuleName>,
				]
			: [DefineConfigRulePrimary<DefineConfigRuleSetting<Preset, RuleName>>];

/**
 * Current CSS rule value exposed to rule callbacks.
 */
type DefineConfigCssRuleCallbackValue<RuleName extends DefineConfigCssRuleName> =
	DefineConfigRuleCallbackValue<'css', RuleName>;

/**
 * Current SCSS rule value exposed to rule callbacks.
 */
type DefineConfigScssRuleCallbackValue<RuleName extends DefineConfigScssRuleName> =
	DefineConfigRuleCallbackValue<'scss', RuleName>;

/**
 * Base chainable helper used to transform one configured rule.
 */
type DefineConfigRuleBuilderBase<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> = {
	/**
	 * Current package rule value normalized as `[primary, secondary?]`.
	 */
	readonly value: DefineConfigRuleCallbackValue<Preset, RuleName>;
	/**
	 * Standard Stylelint secondary options currently set in the package rule value.
	 */
	readonly stylelintOptions: Readonly<Partial<DefineConfigRuleSecondaryOptions>>;
	/**
	 * Disable the rule.
	 */
	disable: () => DefineConfigRuleBuilder<Preset, RuleName>;
	/**
	 * Disable autofix for the rule.
	 */
	disableFix: () => DefineConfigRuleBuilder<Preset, RuleName>;
	/**
	 * Re-enable autofix for the rule.
	 */
	enableFix: () => DefineConfigRuleBuilder<Preset, RuleName>;
	/**
	 * Replace the rule primary option.
	 */
	setPrimary: (
		primary: DefineConfigRulePrimary<DefineConfigRuleSetting<Preset, RuleName>>,
	) => DefineConfigRuleBuilder<Preset, RuleName>;
	/**
	 * Set the rule severity.
	 */
	setSeverity: (severity: 'error' | 'warning') => DefineConfigRuleBuilder<Preset, RuleName>;
	/**
	 * Set standard Stylelint secondary options hidden from `rule.value`.
	 */
	setStylelintOptions: (
		options: Partial<DefineConfigRuleSecondaryOptions>,
	) => DefineConfigRuleBuilder<Preset, RuleName>;
	/**
	 * Replace the whole normalized rule value.
	 */
	setValue: (
		value: DefineConfigRuleValueTuple<Preset, RuleName>,
	) => DefineConfigRuleBuilder<Preset, RuleName>;
};

/**
 * Secondary-options helper available only for rules that define rule-specific secondary options.
 */
type DefineConfigRuleBuilderSetSecondary<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	[DefineConfigRuleAvailableSecondary<Preset, RuleName>] extends [never]
		? object
		: {
			/**
			 * Replace or transform the rule-specific secondary options.
			 */
			setSecondary: (
				secondary:
					| DefineConfigRuleSecondaryReplacement<Preset, RuleName>
					| DefineConfigRuleSecondaryCallback<Preset, RuleName>,
			) => DefineConfigRuleBuilder<Preset, RuleName>;
		};

/**
 * Chainable helper used to transform one configured rule.
 */
type DefineConfigRuleBuilder<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	DefineConfigRuleBuilderBase<Preset, RuleName>
	& DefineConfigRuleBuilderSetSecondary<Preset, RuleName>;

/**
 * Chainable helper used to transform one configured CSS rule.
 */
type DefineConfigCssRuleBuilder<RuleName extends DefineConfigCssRuleName> =
	DefineConfigRuleBuilder<'css', RuleName>;

/**
 * Chainable helper used to transform one configured SCSS rule.
 */
type DefineConfigScssRuleBuilder<RuleName extends DefineConfigScssRuleName> =
	DefineConfigRuleBuilder<'scss', RuleName>;

/**
 * User-provided value for a configured rule.
 */
type DefineConfigRuleValue<
	Preset extends DefineConfigRulePreset,
	RuleName extends DefineConfigRuleName<Preset>,
> =
	| DefineConfigRuleSetting<Preset, RuleName>
	| ((rule: DefineConfigRuleBuilder<Preset, RuleName>) => DefineConfigRuleBuilder<Preset, RuleName> | void);

/**
 * User-provided value for a configured CSS rule.
 */
type DefineConfigCssRuleValue<RuleName extends DefineConfigCssRuleName> =
	DefineConfigRuleValue<'css', RuleName>;

/**
 * User-provided value for a configured SCSS rule.
 */
type DefineConfigScssRuleValue<RuleName extends DefineConfigScssRuleName> =
	DefineConfigRuleValue<'scss', RuleName>;

/**
 * Keeps plugin rule type augmentations reachable from the emitted declaration file.
 */
type DefineConfigStylelintTypeAugmentations =
	& typeof import('@stylelint-types/stylelint-order')
	& typeof import('@stylelint-types/stylelint-scss')
	& typeof import('@stylelint-types/stylelint-stylistic');

/**
 * Rule overrides accepted by `defineConfig`.
 */
type DefineConfigRuleOptionsMap<Preset extends DefineConfigRulePreset, Rules extends object> = {
	[RuleName in keyof Rules as RuleName extends DefineConfigRuleName<Preset> ? RuleName : never]?:
	RuleName extends DefineConfigRuleName<Preset>
		? DefineConfigRuleValue<Preset, RuleName>
		: never;
};

/**
 * CSS rule overrides accepted by `defineConfig`.
 */
type DefineConfigCssRuleOptionsMap<Rules extends object> = DefineConfigRuleOptionsMap<'css', Rules>;

/**
 * SCSS rule overrides accepted by `defineConfig`.
 */
type DefineConfigScssRuleOptionsMap<Rules extends object> = DefineConfigRuleOptionsMap<'scss', Rules>;

/**
 * CSS rule overrides accepted by `defineConfig`.
 */
type DefineConfigCssRulesOptions =
	& DefineConfigCssRuleOptionsMap<StylelintCoreRules>
	& DefineConfigCssRuleOptionsMap<StylelintCustomRuleOptions>
	& DefineConfigCssRuleOptionsMap<DefineConfigCssLocalPluginRules>
	& DefineConfigCssRuleOptionsMap<DefineConfigBemPluginRules>;

/**
 * SCSS rule overrides accepted by `defineConfig`.
 */
type DefineConfigScssRulesOptions =
	& DefineConfigScssRuleOptionsMap<StylelintCoreRules>
	& DefineConfigScssRuleOptionsMap<StylelintCustomRuleOptions>
	& DefineConfigScssRuleOptionsMap<DefineConfigCssLocalPluginRules>
	& DefineConfigScssRuleOptionsMap<DefineConfigScssLocalPluginRules>
	& DefineConfigScssRuleOptionsMap<DefineConfigBemPluginRules>;

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
 * Current BEM rule value exposed to rule callbacks.
 */
type DefineConfigBemRuleCallbackValue<RuleName extends DefineConfigDefaultBemRuleName> =
	DefineConfigRuleCallbackValue<'bem', RuleName>;

/**
 * Chainable helper used to transform one configured BEM rule.
 */
type DefineConfigBemRuleBuilder<RuleName extends DefineConfigDefaultBemRuleName> =
	DefineConfigRuleBuilder<'bem', RuleName>;

/**
 * Normalized BEM rule value accepted by the rule builder.
 */
type DefineConfigBemRuleValueTuple<RuleName extends DefineConfigDefaultBemRuleName> =
	DefineConfigRuleValueTuple<'bem', RuleName>;

/**
 * User-provided value for a BEM rule with built-in defaults.
 */
type DefineConfigBemRuleValue<RuleName extends DefineConfigDefaultBemRuleName> =
	DefineConfigRuleValue<'bem', RuleName>;

/**
 * BEM rule overrides accepted by `defineConfig`.
 */
type DefineConfigBemRulesOptions = DefineConfigRuleOptionsMap<'bem', DefineConfigBemPluginRules> & {
	/**
	 * Additional Stylelint rules that should be added to the same BEM override.
	 */
	[ruleName: string]: unknown;
};

/**
 * Rule overrides accepted by `defineConfig`.
 */
type DefineConfigRulesOptions<Preset extends DefineConfigRulePreset = DefineConfigPreset> =
	Preset extends 'css'
		? DefineConfigCssRulesOptions
		: Preset extends 'scss'
			? DefineConfigScssRulesOptions
			: DefineConfigBemRulesOptions;

/**
 * Options consumed by the rule override factory.
 */
type DefineConfigRulesFactoryOptions<Preset extends DefineConfigPreset = DefineConfigPreset> = {
	/**
	 * Base package preset whose configured rule defaults should be exposed.
	 */
	preset?: Preset;
	/**
	 * Preset rule overrides.
	 */
	rules?: DefineConfigRulesOptions<Preset>;
	/**
	 * Diagnostics mode for rule builder setters that do not change the current config.
	 *
	 * @default 'warn'
	 */
	rulesDiagnostics?: DefineConfigRulesDiagnostics;
} & DefineConfigStylelintTypeAugmentations;

/**
 * Options consumed by the CSS rule override factory.
 */
type DefineConfigCssRulesFactoryOptions = DefineConfigRulesFactoryOptions<'css'>;

/**
 * Options consumed by the SCSS rule override factory.
 */
type DefineConfigScssRulesFactoryOptions = DefineConfigRulesFactoryOptions<'scss'>;

/**
 * Options used to create BEM rules without wrapping them into a Stylelint override.
 */
type DefineConfigBemRulesFactoryOptions = {
	/**
	 * Rule overrides merged over the built-in BEM defaults.
	 */
	rules?: DefineConfigBemRulesOptions;
	/**
	 * Diagnostics mode for rule builder setters that do not change the current config.
	 *
	 * @default 'warn'
	 */
	rulesDiagnostics?: DefineConfigRulesDiagnostics;
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
 * Options shared by syntax preset factories.
 */
type DefineConfigPresetFactoryBaseOptions = DefineConfigOrderFactoryOptions & {
	/**
	 * Style files that should receive this preset config.
	 */
	files?: string | string[];
};

/**
 * Options accepted by the CSS preset factory.
 */
type DefineConfigCssPresetFactoryOptions =
	& DefineConfigPresetFactoryBaseOptions
	& Omit<DefineConfigCssRulesFactoryOptions, 'preset'>;

/**
 * Options accepted by the SCSS preset factory.
 */
type DefineConfigScssPresetFactoryOptions =
	& DefineConfigPresetFactoryBaseOptions
	& Omit<DefineConfigScssRulesFactoryOptions, 'preset'>;

/**
 * Stylelint override shape used by generated scoped configs.
 */
type DefineConfigStylelintOverride = NonNullable<Config['overrides']>[number];

export type {
	ConfigurableOrderGroupName,
	DefineConfigBemOptions,
	DefineConfigBemPluginRules,
	DefineConfigBemRuleBuilder,
	DefineConfigBemRuleCallbackValue,
	DefineConfigBemRuleName,
	DefineConfigBemRuleSetting,
	DefineConfigBemRulesFactoryOptions,
	DefineConfigBemRulesOptions,
	DefineConfigBemRuleValue,
	DefineConfigBemRuleValueTuple,
	DefineConfigCssPresetFactoryOptions,
	DefineConfigCssRuleBuilder,
	DefineConfigCssRuleCallbackValue,
	DefineConfigCssRuleName,
	DefineConfigCssRuleOptionsMap,
	DefineConfigCssRulesDiagnostics,
	DefineConfigCssRuleSetting,
	DefineConfigCssRulesFactoryOptions,
	DefineConfigCssRulesOptions,
	DefineConfigCssRuleValue,
	DefineConfigCssRuleValueTuple,
	DefineConfigDefaultBemRuleName,
	DefineConfigFlatConfig,
	DefineConfigInputConfig,
	DefineConfigOrderFactoryOptions,
	DefineConfigOrderOptions,
	DefineConfigPreset,
	DefineConfigPresetFactoryBaseOptions,
	DefineConfigPresetName,
	DefineConfigPresetOptions,
	DefineConfigRuleBuilder,
	DefineConfigRuleCallbackValue,
	DefineConfigRuleName,
	DefineConfigRuleOptionsMap,
	DefineConfigRulePreset,
	DefineConfigRulesDiagnostics,
	DefineConfigRuleSetting,
	DefineConfigRulesFactoryOptions,
	DefineConfigRulesOptions,
	DefineConfigRuleValue,
	DefineConfigRuleValueTuple,
	DefineConfigScssPresetFactoryOptions,
	DefineConfigScssRuleBuilder,
	DefineConfigScssRuleCallbackValue,
	DefineConfigScssRuleName,
	DefineConfigScssRuleOptionsMap,
	DefineConfigScssRuleSetting,
	DefineConfigScssRulesFactoryOptions,
	DefineConfigScssRulesOptions,
	DefineConfigScssRuleValue,
	DefineConfigScssRuleValueTuple,
	DefineConfigStylelintConfig,
	DefineConfigStylelintOverride,
	Mutable,
	OrderGroupInput,
	OrderGroupInputItem,
	OrderGroupName,
	RuntimeOrderGroupConfigValue,
};
