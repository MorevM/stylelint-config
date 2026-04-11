/* eslint-disable unicorn/prefer-single-call, unicorn/no-immediate-mutation -- Needed for readability */
const rules = [];

// Functions related to block (e.g. some utility functions) should be on top
rules.push([
	{ type: 'at-rule', name: 'function' },
]);

// SASS Variables
rules.push([
	'dollar-variables',
]);

// CSS variables
rules.push([
	'custom-properties',
]);

// Extends & mixins
rules.push([
	{ type: 'at-rule', name: 'extend' },
	{ type: 'at-rule', name: 'include', hasBlock: false },
]);

// Properties
rules.push([
	'declarations',
]);

// Contextual states
rules.push([
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
]);

rules.push([
	{ type: 'at-rule', name: 'include', hasBlock: true },
]);

// Container queries
rules.push([
	{ type: 'at-rule', name: 'starting-style' },
]);

// Media queries in the right order
rules.push([
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
]);

// Container queries
rules.push([
	{ type: 'at-rule', name: 'container' },
]);

// Pseudo-classes
rules.push([
	{ type: 'rule', selector: '&:link,?' },
	{ type: 'rule', selector: '&:visited,?' },
	{ type: 'rule', selector: '&:hover,?' },
	{ type: 'rule', selector: '&:focus-within,?' },
	{ type: 'rule', selector: '&:focus,?' },
	{ type: 'rule', selector: '&:focus-visible,?' },
	{ type: 'rule', selector: '&:active,?' },
	{ type: 'rule', selector: '^&:\\w,?' },
]);

rules.push(
	{ type: 'rule', selector: '^&\\.' },
	{ type: 'rule', selector: '^&\\[' },
	{ type: 'rule', selector: '&:(?:is|has|not)' },
	{ type: 'rule', selector: '^&--' },
);

// Pseudo-elements except ::marker, ::before and ::after like ::placeholder
// Prefixed non-standard pseudo-elements like ::-ms-clear or :-webkit-autofill
rules.push([
	{ type: 'rule', selector: '^&::(?!marker\\b|before\\b|after\\b)\\w+' },
	{ type: 'rule', selector: '^&[:]{1,2}-\\w+' },
]);

// ::marker, ::before, ::after
rules.push([
	{ type: 'rule', selector: '^&[:]{1,2}marker,?' },
	{ type: 'rule', selector: '^&[:]{1,2}before,?' },
	{ type: 'rule', selector: '^&[:]{1,2}after,?' },
	{ type: 'rule', selector: '^&[:]{1,2}before,\s*&[:]{1,2}after,?' },

	{ type: 'rule', selector: '^&:hover[:]{1,2}before,?' },
	{ type: 'rule', selector: '^&:focus[:]{1,2}before,?' },
	{ type: 'rule', selector: '^&:active[:]{1,2}before,?' },
	{ type: 'rule', selector: '^&:\\w+[:]{1,2}before,?' },

	{ type: 'rule', selector: '^&:hover[:]{1,2}after,?' },
	{ type: 'rule', selector: '^&:focus[:]{1,2}after,?' },
	{ type: 'rule', selector: '^&:active[:]{1,2}after,?' },
	{ type: 'rule', selector: '^&:\\w+[:]{1,2}after,?' },
]);

// BEM Elements
rules.push([
	{ type: 'rule', selector: '^& &__\\w+' },
	{ type: 'rule', selector: '^&__\\w+' },
]);

// Nesting & side-effects
rules.push([
	{ type: 'rule', selector: '#{' },
	'rules',
	{ type: 'at-rule', selector: 'at-root' },
]);

// Selectors which (potentially) increases specificity
rules.push([
	{ type: 'rule', selector: '^& \\+ &' },
	{ type: 'rule', selector: '^& >' },
	{ type: 'rule', selector: '^& ~' },
]);

export default rules.flat();
