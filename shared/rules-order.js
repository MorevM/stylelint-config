/* eslint-disable unicorn/prefer-single-call -- Needed for readability */
const rules = [];

// Functions related to block (e.g. some helper functions) should be on top
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

// Pseudo-elements except ::before and ::after like ::placeholder
// Prefixed non-standard pseudo-elements like ::-ms-clear or :-webkit-autofill
rules.push([
	{ type: 'rule', selector: '^&::\\w+' },
	{ type: 'rule', selector: '^&[:]{1,2}-\\w+' },
]);

// ::before & ::after
rules.push([
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

// Selectors which increases specificity
rules.push([
	{ type: 'rule', selector: '^&\\[' },
	{ type: 'at-rule', selector: 'at-root' },
	{ type: 'rule', selector: '#{' },
	{ type: 'rule', selector: '^& \\+ &' },
	{ type: 'rule', selector: '^& \\>' },
	{ type: 'rule', selector: '^&\\.' },
]);

rules.push([
	{ type: 'at-rule', name: 'include', hasBlock: true },
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

// BEM
rules.push([
	{ type: 'rule', selector: '^&--' },
	{ type: 'rule', selector: '^& &__\\w+' },
	{ type: 'rule', selector: '^&__\\w+' },
]);

// Nesting
rules.push([
	'rules',
]);

export default rules.flat();
