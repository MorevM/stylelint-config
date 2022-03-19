const _mergeWith = require('lodash.mergewith');
const { WARN } = require('./constants.js');

const mergeWithArrayComparer = (ov, sv) =>
	(Array.isArray(ov) ? [...new Set([...sv || [], ...ov || []])] : undefined);

const autofixableRulesToWarn = (rules, autofixableList) => Object.fromEntries(
	Object.entries(rules)
		.map(([rule, value]) => {
			if (!autofixableList.includes(rule)) return [rule, value];
			const newRuleValue = Array.isArray(value)
				? [value[0], { ...value[1], severity: WARN }]
				: [value, { severity: WARN }];
			return [rule, newRuleValue];
		}),
);

const autofixableRulesToOff = (rules, autofixableList) => Object.fromEntries(
	Object.entries(rules)
		.map(([rule, value]) => [rule, autofixableList.includes(rule) ? null : value]),
);

const getProcessedRules = ({ mode, base, rules }) => {
	if (mode === 'strict') return rules;

	const autofixableRules = Object.entries(base.rules)
		.filter(([key]) => key.startsWith('+'))
		.map(([key]) => key.slice(1));

	return mode === 'default'
		? autofixableRulesToWarn(rules, autofixableRules)
		: autofixableRulesToOff(rules, autofixableRules); // assume `quiet`
};

const processExports = ({ mode, base, parts }) => {
	const mergedParts = _mergeWith(
		{},
		{ ...base },
		...(parts || []),
		mergeWithArrayComparer,
	);

	const rules = Object.fromEntries(
		Object.entries(mergedParts.rules)
			.reduce((acc, [rule, value]) => {
				if (rule.startsWith('!')) {
					if (Array.isArray(value)) {
						value[1] = { ...value[1], disableFix: true };
					} else {
						value = [value, { disableFix: true }];
					}
				}
				return [...acc, [rule.replace(/^[!+]/, ''), value]];
			}, []),
	);

	const processedRules = getProcessedRules({ mode, base: mergedParts, rules });

	return _mergeWith(
		{ ...mergedParts, rules: processedRules },
		mergeWithArrayComparer,
	);
};


module.exports = { processExports, mergeWithArrayComparer };
