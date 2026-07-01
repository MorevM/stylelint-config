import type {
	RulesOrderGroups as OrderGroups,
	RuleOrderItem as OrderItem,
} from '#shared';

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
 * Options accepted by `defineConfig`.
 */
type DefineConfigOptions = {
	/**
	 * Order group overrides merged into the generated `order/order` rule.
	 */
	order?: DefineConfigOrderOptions;
	/**
	 * Base package preset extended by the generated config.
	 */
	preset?: DefineConfigPreset;
};

export type {
	ConfigurableOrderGroupName,
	DefineConfigOptions,
	DefineConfigOrderOptions,
	DefineConfigPreset,
	Mutable,
	OrderGroupInput,
	OrderGroupInputItem,
	OrderGroupName,
	RuntimeOrderGroupConfigValue,
};
