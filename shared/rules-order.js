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

// Pseudo-elements except ::before and ::after like ::placeholder
// Prefixed non-standard pseudo-elements like ::-ms-clear or :-webkit-autofill
// TODO: &--placeholder-visible::placeholder after ::placeholder (cardplace)
rules.push([
	{ type: 'rule', selector: '^&::\w+' },
	{ type: 'rule', selector: '^&[:]{1,2}-\w+' },
]);

// ::before & ::after
rules.push([
	{ type: 'rule', selector: '^&[:]{1,2}before,?' },
	{ type: 'rule', selector: '^&[:]{1,2}after,?' },
	{ type: 'rule', selector: '^&[:]{1,2}before,\s*&[:]{1,2}after,?' },

	{ type: 'rule', selector: '^&:hover[:]{1,2}before,?' },
	{ type: 'rule', selector: '^&:active[:]{1,2}before,?' },
	{ type: 'rule', selector: '^&:focus[:]{1,2}before,?' },
	{ type: 'rule', selector: '^&:\\w+[:]{1,2}before,?' },

	{ type: 'rule', selector: '^&:hover[:]{1,2}after,?' },
	{ type: 'rule', selector: '^&:active[:]{1,2}after,?' },
	{ type: 'rule', selector: '^&:focus[:]{1,2}after,?' },
	{ type: 'rule', selector: '^&:\\w+[:]{1,2}after,?' },
]);

// Pseudo-classes
rules.push([
	{ type: 'rule', selector: '&:hover,?' },
	{ type: 'rule', selector: '&:active,?' },
	{ type: 'rule', selector: '&:focus,?' },
	{ type: 'rule', selector: '^&:\\w,?' },
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

// Media queries in right order
rules.push([
	{ type: 'at-rule', name: 'media', parameter: '\(--phone-small\)' }, // >= 320
	{ type: 'at-rule', name: 'media', parameter: '\(--phone-standard\)' }, // same as above, legacy option
	{ type: 'at-rule', name: 'media', parameter: '\(--phone-portrait\)' }, // >= 360
	{ type: 'at-rule', name: 'media', parameter: '\(--phone-landscape\)' }, // >= 480
	{ type: 'at-rule', name: 'media', parameter: '\(--tablet-portrait\)' }, // >= 768
	{ type: 'at-rule', name: 'media', parameter: '\(--tablet-standard\)' }, // same as above, legacy option
	{ type: 'at-rule', name: 'media', parameter: '\(--tablet-landscape\)' }, // >= 1024
	{ type: 'at-rule', name: 'media', parameter: '\(--laptop\)' }, // >= 1280
	{ type: 'at-rule', name: 'media', parameter: '\(--desktop-middle\)' }, // > >= 1440, legacy option
	{ type: 'at-rule', name: 'media', parameter: '\(--desktop\)' }, // > >= 1660px
	{ type: 'at-rule', name: 'media', parameter: '\(--desktop-wide\)' }, // same as above, legacy option
	{ type: 'at-rule', name: 'media', parameter: '\(--desktop-2k\)' }, // > 1921
	{ type: 'at-rule', name: 'media', parameter: '\(--desktop-4k\)' }, // > 2561
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
