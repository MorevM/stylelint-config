import { WARNING } from './constants.js';

type PlainObject = Record<string, unknown>;
type RuleValue = unknown;

type ConfigPart = PlainObject & {
	rules?: Record<string, RuleValue>;
};

const isPlainObject = (value: unknown): value is PlainObject =>
	value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof RegExp);

const arrayUnique = <T>(array: T[]) => [...new Set(array)];

const omit = (object: PlainObject, ...keys: string[]) => Object.fromEntries(
	Object.entries(object).filter(([key]) => !keys.includes(key)),
);

const mergeObjects = (target: PlainObject, ...sources: PlainObject[]) => {
	for (const source of sources) {
		for (const [key, value] of Object.entries(source)) {
			const currentValue = target[key];

			if (Array.isArray(currentValue) && Array.isArray(value)) {
				target[key] = arrayUnique([...currentValue, ...value]);
				continue;
			}

			if (isPlainObject(currentValue) && isPlainObject(value)) {
				target[key] = mergeObjects({ ...currentValue }, value);
				continue;
			}

			target[key] = Array.isArray(value) ? [...value] : value;
		}
	}

	return target;
};

const addRuleOption = (value: RuleValue, option: PlainObject) => {
	if (!Array.isArray(value)) {
		return [value, option];
	}

	const [primaryValue, secondaryOptions = {}] = value as [unknown, PlainObject?];

	return [primaryValue, { ...secondaryOptions, ...option }];
};

const autofixableRulesToWarn = (rules: Record<string, RuleValue>, autofixableList: string[]) => Object.fromEntries(
	Object.entries(rules)
		.map(([rule, value]) => {
			if (!autofixableList.includes(rule)) return [rule, value];
			return [rule, addRuleOption(value, { severity: WARNING })];
		}),
);

const getProcessedRules = ({ base, rules }: { base: ConfigPart; rules: Record<string, RuleValue> }) => {
	const autofixableRules = Object.entries(base.rules ?? {})
		.filter(([key]) => key.startsWith('+'))
		.map(([key]) => key.slice(1));

	return autofixableRulesToWarn(rules, autofixableRules);
};

export const mergeObjectsConsideringArrays = mergeObjects;

export const processExports = ({ base, parts }: { base: ConfigPart; parts: ConfigPart[] }) => {
	const mergedParts = mergeObjectsConsideringArrays({}, base, ...parts) as ConfigPart;

	const rules = Object.fromEntries(
		Object.entries(mergedParts.rules ?? {})
			.reduce<Array<[string, RuleValue]>>((acc, [rule, value]) => {
				let ruleValue = value;

				if (rule.startsWith('!')) {
					ruleValue = addRuleOption(ruleValue, { disableFix: true });
				}

				return [...acc, [rule.replace(/^[!+]/, ''), ruleValue]];
			}, []),
	);

	const processedRules = getProcessedRules({ base: mergedParts, rules });

	return mergeObjects(omit(mergedParts, 'rules'), { rules: processedRules });
};
