/**
 * Stylelint Order matcher for a nested at-rule.
 */
type RuleOrderAtRule = {
	/**
	 * Marker for nested at-rule order items.
	 */
	type: 'at-rule';
	/**
	 * Restricts the at-rule to block or statement form.
	 */
	hasBlock?: boolean;
	/**
	 * At-rule name without the `@` prefix.
	 */
	name?: string;
	/**
	 * Pattern matched against the at-rule parameters.
	 */
	parameter?: RegExp | string;
	/**
	 * Pattern matched against the at-rule selector representation.
	 */
	selector?: string;
};

/**
 * Stylelint Order matcher for a nested selector rule.
 */
type RuleOrderRule = {
	/**
	 * Marker for nested selector rule order items.
	 */
	type: 'rule';
	/**
	 * Pattern matched against the nested selector.
	 */
	selector: string;
};

/**
 * Any item accepted by the Stylelint Order `order/order` rule.
 */
type RuleOrderItem = RuleOrderAtRule | RuleOrderRule | string;

const RULES_ORDER_GROUPS = {
	// Functions related to block (e.g. some utility functions) should be on top
	functions: [
		{ type: 'at-rule', name: 'function' },
	],

	// SASS Variables
	sassVariables: [
		'dollar-variables',
	],

	// Custom properties
	customProperties: [
		'custom-properties',
	],

	// Extends
	extends: [
		{ type: 'at-rule', name: 'extend' },
	],

	// Mixins
	mixins: [
		{ type: 'at-rule', name: 'include', hasBlock: false },
	],

	// Properties
	declarations: [
		'declarations',
	],

	// Contextual states
	contextualStates: [
		{ type: 'rule', selector: '&:empty,?' },

		{ type: 'rule', selector: '&:only-child,?' },
		{ type: 'rule', selector: '&:only-of-type,?' },

		{ type: 'rule', selector: '&:first-child,?' },
		{ type: 'rule', selector: '&:last-child,?' },

		{ type: 'rule', selector: '&:first-of-type,?' },
		{ type: 'rule', selector: '&:last-of-type,?' },

		{ type: 'rule', selector: '&:nth-child,?' },
		{ type: 'rule', selector: '&:nth-last-child,?' },

		{ type: 'rule', selector: '&:nth-of-type,?' },
		{ type: 'rule', selector: '&:nth-last-of-type,?' },
	],

	blockMixins: [
		{ type: 'at-rule', name: 'include', hasBlock: true },
	],

	// Starting styles
	startingStyles: [
		{ type: 'at-rule', name: 'starting-style' },
	],

	// Media queries in the right order
	mediaQueries: [
		{ type: 'at-rule', name: 'media', parameter: '\(--less-phone-small\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--phone-small\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--less-phone-medium\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--phone-medium\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--less-phone-large\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--phone-large\)' },
		//
		{ type: 'at-rule', name: 'media', parameter: '\(--less-tablet-small\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--tablet-small\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--less-tablet-medium\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--tablet-medium\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--less-tablet-large\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--tablet-large\)' },
		//
		{ type: 'at-rule', name: 'media', parameter: '\(--less-laptop-small\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--laptop-small\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--less-laptop-medium\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--laptop-medium\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--less-laptop-large\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--laptop-large\)' },
		//
		{ type: 'at-rule', name: 'media', parameter: '\(--less-desktop\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--desktop\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--less-desktop-2k\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--desktop-2k\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--less-desktop-4k\)' },
		{ type: 'at-rule', name: 'media', parameter: '\(--desktop-4k\)' },
		{ type: 'at-rule', name: 'media' }, // rest
	],

	// Container queries
	containerQueries: [
		{ type: 'at-rule', name: 'container' },
	],

	// Pseudo-classes
	pseudoClasses: [
		{ type: 'rule', selector: '&:link,?' },
		{ type: 'rule', selector: '&:visited,?' },
		{ type: 'rule', selector: '&:hover,?' },
		{ type: 'rule', selector: '&:focus-within,?' },
		{ type: 'rule', selector: '&:focus,?' },
		{ type: 'rule', selector: '&:focus-visible,?' },
		{ type: 'rule', selector: '&:active,?' },
		{ type: 'rule', selector: '^&:\\w,?' },
	],

	selectorVariants: [
		{ type: 'rule', selector: '^&\\.' },
		{ type: 'rule', selector: '^&\\[' },
		{ type: 'rule', selector: '&:(?:is|has|not)' },
		{ type: 'rule', selector: '^&--' },
	],

	// Pseudo-elements except ::marker, ::before and ::after like ::placeholder
	// Prefixed non-standard pseudo-elements like ::-ms-clear or :-webkit-autofill
	vendorPseudoElements: [
		{ type: 'rule', selector: '^&::(?!marker\\b|before\\b|after\\b)\\w+' },
		{ type: 'rule', selector: '^&[:]{1,2}-\\w+' },
	],

	// ::marker, ::before, ::after
	generatedPseudoElements: [
		{ type: 'rule', selector: '^&[:]{1,2}marker,?' },
		{ type: 'rule', selector: '^&[:]{1,2}before,?' },
		{ type: 'rule', selector: '^&[:]{1,2}after,?' },
		{ type: 'rule', selector: '^&[:]{1,2}before,\\s*&[:]{1,2}after,?' },

		{ type: 'rule', selector: '^&:hover[:]{1,2}before,?' },
		{ type: 'rule', selector: '^&:focus[:]{1,2}before,?' },
		{ type: 'rule', selector: '^&:active[:]{1,2}before,?' },
		{ type: 'rule', selector: '^&:\\w+[:]{1,2}before,?' },

		{ type: 'rule', selector: '^&:hover[:]{1,2}after,?' },
		{ type: 'rule', selector: '^&:focus[:]{1,2}after,?' },
		{ type: 'rule', selector: '^&:active[:]{1,2}after,?' },
		{ type: 'rule', selector: '^&:\\w+[:]{1,2}after,?' },
	],

	// BEM Elements
	bemElements: [
		{ type: 'rule', selector: '^& &__\\w+' },
		{ type: 'rule', selector: '^&__\\w+' },
	],

	// Nesting & side-effects
	nesting: [
		{ type: 'rule', selector: '#{' },
		'rules',
		{ type: 'at-rule', selector: 'at-root' },
	],

	// Selectors which (potentially) increases specificity
	specificityIncreases: [
		{ type: 'rule', selector: '^& \\+ &' },
		{ type: 'rule', selector: '^& >' },
		{ type: 'rule', selector: '^& ~' },
	],
} as const;

/**
 * Named groups that compose the default `order/order` sequence.
 */
type RulesOrderGroups = typeof RULES_ORDER_GROUPS;

const RULES_ORDER: RuleOrderItem[] = Object.values(RULES_ORDER_GROUPS).flat();

export {
	RULES_ORDER,
	RULES_ORDER_GROUPS,
	type RuleOrderAtRule,
	type RuleOrderItem,
	type RuleOrderRule,
	type RulesOrderGroups,
};
export default RULES_ORDER;
