import { escapeRegExp, hash, isFunction, isString } from '@morev/utils';
import { WARNING } from '#constants';
import { RULES_ORDER_GROUPS } from '#shared';
import type { Config } from 'stylelint';
import type {
	RulesOrderGroups as OrderGroups,
	RuleOrderItem as OrderItem,
} from '#shared';
import type {
	ConfigurableOrderGroupName,
	DefineConfigOrderFactoryOptions,
	DefineConfigOrderOptions,
	Mutable,
	OrderGroupInput,
	OrderGroupInputItem,
	OrderGroupName,
	RuntimeOrderGroupConfigValue,
} from './types';

/**
 * Clones an order item without touching string shorthands.
 *
 * @param   item   Order item from default values or user input.
 *
 * @returns        A cloned matcher object or the original string matcher.
 */
const cloneOrderItem = (item: OrderItem): OrderItem => {
	return isString(item) ? item : { ...item };
};

/**
 * Clones a readonly order group into mutable values passed to user callbacks.
 *
 * @param   items   Readonly order group values.
 *
 * @returns         Mutable clones of the provided order items.
 */
const cloneOrderItems = <Items extends readonly OrderItem[]>(items: Items) =>
	items.map((item) => cloneOrderItem(item)) as Mutable<Items>;

/**
 * Order groups that users can replace or transform through `defineConfig`.
 */
const CONFIGURABLE_ORDER_GROUP_NAMES: ConfigurableOrderGroupName[] = [
	'blockMixins',
	'containerQueries',
	'mediaQueries',
	'mixins',
];

/**
 * Checks whether an order group is configurable through public options.
 *
 * @param   name   Built-in order group name.
 *
 * @returns        Whether the group accepts public overrides.
 */
const isConfigurableOrderGroupName = (name: OrderGroupName): name is ConfigurableOrderGroupName =>
	CONFIGURABLE_ORDER_GROUP_NAMES.includes(name as ConfigurableOrderGroupName);

/**
 * Wraps media query aliases in parentheses when users provide bare custom media names.
 *
 * @param   name   User-provided media query name.
 *
 * @returns        Media query name wrapped for Stylelint Order matching.
 */
const normalizeMediaQueryName = (name: string) => {
	if (name.startsWith('(')) return name;
	return `(${name})`;
};

/**
 * Converts public string shortcuts into full Stylelint Order matcher objects.
 *
 * @param   groupName   Order group receiving the value.
 * @param   item        User-provided matcher or string shortcut.
 *
 * @returns             Normalized order item.
 */
const normalizeOrderInputItem = (
	groupName: OrderGroupName,
	item: OrderGroupInputItem,
): OrderItem => {
	if (!isString(item)) return item;

	if (groupName === 'mediaQueries') {
		return { type: 'at-rule', name: 'media', parameter: escapeRegExp(normalizeMediaQueryName(item)) };
	}

	if (groupName === 'containerQueries') {
		return { type: 'at-rule', name: 'container', parameter: escapeRegExp(item) };
	}

	if (groupName === 'blockMixins') {
		return { type: 'at-rule', name: 'include', hasBlock: true, parameter: escapeRegExp(item) };
	}

	if (groupName === 'mixins') {
		return { type: 'at-rule', name: 'include', hasBlock: false, parameter: escapeRegExp(item) };
	}

	return item;
};

/**
 * Normalizes all public input values for a single order group.
 *
 * @param   groupName   Order group receiving the values.
 * @param   items       User-provided matchers or string shortcuts.
 *
 * @returns             Normalized order items.
 */
const normalizeOrderInput = (
	groupName: OrderGroupName,
	items: OrderGroupInput,
) => items.map((item) => normalizeOrderInputItem(groupName, item));

/**
 * Restores the broad fallback matcher for configurable groups when custom values omit it.
 *
 * @param   groupName      Order group receiving custom values.
 * @param   items          Normalized custom values.
 * @param   configValues   Default values for the same group.
 * @param   shouldAppend   Whether fallback restoration is allowed.
 *
 * @returns                Values with the broad fallback matcher appended when needed.
 */
const appendWidestMatcher = (
	groupName: OrderGroupName,
	items: OrderItem[],
	configValues: OrderGroups[OrderGroupName],
	shouldAppend: boolean,
) => {
	if (!shouldAppend || !isConfigurableOrderGroupName(groupName)) return items;

	const widestMatcher = configValues.at(-1);
	if (widestMatcher === undefined) return items;

	const normalizedWidestMatcher = normalizeOrderInputItem(
		groupName,
		cloneOrderItem(widestMatcher),
	);
	const widestMatcherKey = hash(normalizedWidestMatcher);

	if (items.some((item) => hash(item) === widestMatcherKey)) return items;

	return [...items, normalizedWidestMatcher];
};

/**
 * Resolves one configured order group from defaults, direct replacements, or callbacks.
 *
 * @param   groupName         Order group being resolved.
 * @param   configValues      Default values for the group.
 * @param   valueOrCallback   User-provided replacement or callback.
 *
 * @returns                   Final order items for the group.
 */
const resolveOrderConfigValue = (
	groupName: OrderGroupName,
	configValues: OrderGroups[OrderGroupName],
	valueOrCallback: RuntimeOrderGroupConfigValue | undefined,
) => {
	const clonedValues = cloneOrderItems(configValues) as OrderItem[];

	if (!valueOrCallback) return normalizeOrderInput(groupName, clonedValues);
	if (!isFunction(valueOrCallback)) {
		return appendWidestMatcher(
			groupName,
			normalizeOrderInput(groupName, valueOrCallback),
			configValues,
			true,
		);
	}

	const result = valueOrCallback(clonedValues);

	return appendWidestMatcher(
		groupName,
		normalizeOrderInput(groupName, result ?? clonedValues),
		configValues,
		true,
	);
};

/**
 * Reads a group option only for groups that are intentionally configurable.
 *
 * @param   groupName   Order group being read.
 * @param   options     Public order override options.
 *
 * @returns             Runtime option value for configurable groups.
 */
const getOrderGroupConfigValue = (
	groupName: OrderGroupName,
	options: DefineConfigOrderOptions,
): RuntimeOrderGroupConfigValue | undefined => {
	if (!isConfigurableOrderGroupName(groupName)) return undefined;
	return options[groupName] as RuntimeOrderGroupConfigValue | undefined;
};

/**
 * Builds the final Stylelint Order sequence from package defaults and user overrides.
 *
 * @param   options   Public order override options.
 *
 * @returns           Flattened Stylelint Order sequence.
 */
const createOrder = (options: DefineConfigOrderOptions = {}) => {
	const groups = {} as Record<OrderGroupName, OrderItem[]>;

	for (const name of Object.keys(RULES_ORDER_GROUPS) as OrderGroupName[]) {
		groups[name] = resolveOrderConfigValue(
			name,
			RULES_ORDER_GROUPS[name],
			getOrderGroupConfigValue(name, options),
		);
	}

	return Object.values(groups).flat();
};

/**
 * Creates the Stylelint rule block for custom declaration and nested rule ordering.
 *
 * @param   options   Public define-config options.
 *
 * @returns           Stylelint config fragment for ordering rules.
 */
const createOrderConfig = (options: DefineConfigOrderFactoryOptions): Config => {
	if (!options.order) return {};

	const rules: NonNullable<Config['rules']> = {
		'order/order': [createOrder(options.order), { severity: WARNING }],
	};

	return { rules };
};

export { createOrderConfig };
