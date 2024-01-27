import { arrayUnique, createMergeObjects, isArray, mergeObjects, omit } from '@morev/utils';
import { WARN } from './constants.js';

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

const getProcessedRules = ({ base, rules }) => {
	const autofixableRules = Object.entries(base.rules)
		.filter(([key]) => key.startsWith('+'))
		.map(([key]) => key.slice(1));

	return autofixableRulesToWarn(rules, autofixableRules);
};

export const mergeObjectsConsideringArrays = createMergeObjects((obj, key, value, stack) => {
	if (isArray(obj[key]) && isArray(value)) {
		obj[key] = arrayUnique([...obj[key], ...value]);
		return true;
	}
	return false;
});

export const processExports = ({ base, parts }) => {
	const mergedParts = mergeObjectsConsideringArrays({}, base, ...parts);

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

	const processedRules = getProcessedRules({ base: mergedParts, rules });

	return mergeObjects(omit(mergedParts, 'rules'), { rules: processedRules });
};
