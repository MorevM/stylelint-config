import { arrayUnique, createMergeObjects, isPlainObject, toArray as valueToArray } from '@morev/utils';
import type { PlainObject } from '@morev/utils';

type RuleValue = unknown;

type ConfigPart = PlainObject & {
	rules?: Record<string, RuleValue>;
};

const ARRAY_MERGE_KEYS = ['extends', 'overrides', 'plugins'];

const toArray = <T>(value: T | T[] | undefined) => {
	if (value === undefined) return [];
	return valueToArray(value);
};

export const mergeStylelintConfigs = createMergeObjects((object, key, value, stack) => {
	const currentValue = object[key];

	if (stack === '' && key === 'rules' && isPlainObject(value)) {
		(object as PlainObject)[key as string] = {
			...(isPlainObject(currentValue) ? currentValue : {}),
			...value,
		};

		return true;
	}

	if (stack === '' && ARRAY_MERGE_KEYS.includes(key as string)) {
		(object as PlainObject)[key as string] = arrayUnique([
			...toArray(currentValue),
			...toArray(value),
		]);
		return true;
	}

	if (Array.isArray(value)) {
		(object as PlainObject)[key as string] = [...value];
		return true;
	}

	return undefined;
});

export const processExports = (base: ConfigPart, ...parts: ConfigPart[]): ConfigPart =>
	mergeStylelintConfigs(base, ...parts);
