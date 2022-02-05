const _mergeWith = require('lodash.mergewith');
const { WARN } = require('./constants');

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

const getProcessedRules = ({ autofixable, base, rules }) => {
	if (autofixable === 'bypass') return rules;

	const autofixableRules = Object.entries(base.rules)
		.filter(([key]) => key.startsWith('+'))
		.map(([key]) => key.slice(1));

	return autofixable === 'warn'
		? autofixableRulesToWarn(rules, autofixableRules)
		: autofixableRulesToOff(rules, autofixableRules);
};

const processExports = ({ autofixable, base, parts }) => {
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

	const processedRules = getProcessedRules({ autofixable, base: mergedParts, rules });

	return _mergeWith(
		{ ...mergedParts, rules: processedRules },
		mergeWithArrayComparer,
	);
};


module.exports = { processExports, mergeWithArrayComparer };
