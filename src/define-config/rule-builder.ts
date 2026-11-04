import { deepClone, deepEqual, isFunction, isPlainObject, isUndefined } from '@morev/utils';
import type { Config } from 'stylelint';
import type { DefineConfigRulesDiagnostics } from './types';

type RuleSetting = NonNullable<Config['rules']>[string];
type NormalizedRuleValue = [unknown, unknown?];
type SecondaryOptions = Record<string, unknown>;

const STYLELINT_SECONDARY_OPTION_NAMES = new Set([
	'disableFix',
	'message',
	'reportDisables',
	'severity',
	'url',
]);

const PRIMARY_ARRAY_RULE_NAMES = new Set<string>([
	'plugin/selector-tag-no-without-class',
]);

const shouldKeepPrimaryArray = (ruleName: string, value: unknown) =>
	PRIMARY_ARRAY_RULE_NAMES.has(ruleName) && Array.isArray(value);

const normalizeRuleValue = (ruleName: string, value: unknown): NormalizedRuleValue => {
	if (value === null || value === undefined) return [null];
	if (shouldKeepPrimaryArray(ruleName, value)) return [value];

	if (Array.isArray(value)) {
		const [, secondary] = value;
		if (value.length === 1 || isPlainObject(secondary)) {
			return value as NormalizedRuleValue;
		}
	}

	return [value];
};

const splitSecondaryOptions = (secondary: unknown) => {
	const ruleSecondary: SecondaryOptions = {};
	const stylelintOptions: SecondaryOptions = {};

	if (!isPlainObject(secondary)) {
		return { ruleSecondary, stylelintOptions };
	}

	for (const [key, value] of Object.entries(secondary)) {
		if (STYLELINT_SECONDARY_OPTION_NAMES.has(key)) {
			stylelintOptions[key] = value;
			continue;
		}

		ruleSecondary[key] = value;
	}

	return { ruleSecondary, stylelintOptions };
};

const hasOptions = (options: SecondaryOptions) => Object.keys(options).length > 0;

const toRuleValue = (primary: unknown, secondary: SecondaryOptions): NormalizedRuleValue =>
	hasOptions(secondary) ? [primary, secondary] : [primary];

class RuleBuilder {
	readonly #diagnostics: DefineConfigRulesDiagnostics;

	readonly #ruleName: string;

	#value: NormalizedRuleValue;

	#stylelintOptions: SecondaryOptions;

	public constructor(ruleName: string, value: unknown, diagnostics: DefineConfigRulesDiagnostics) {
		const [primary, secondary] = normalizeRuleValue(ruleName, value);
		const { ruleSecondary, stylelintOptions } = splitSecondaryOptions(secondary);

		this.#diagnostics = diagnostics;
		this.#ruleName = ruleName;
		this.#value = toRuleValue(primary, ruleSecondary);
		this.#stylelintOptions = stylelintOptions;
	}

	private getSecondary() {
		const [, secondary] = this.#value;
		return isPlainObject(secondary) ? secondary : {};
	}

	private haveStylelintOptionChanges(stylelintOptions: SecondaryOptions) {
		return Object.entries(stylelintOptions)
			.some(([key, value]) => !deepEqual(this.#stylelintOptions[key], value));
	}

	private reportRedundantSetter(methodName: string) {
		if (this.#diagnostics === 'off') return;

		const methodLabel = methodName.includes('(') ? methodName : `${methodName}()`;
		const message = `@morev/stylelint-config: "${this.#ruleName}" rule ${methodLabel} received a value equal to the current config.`;
		if (this.#diagnostics === 'error') {
			throw new Error(message);
		}

		console.warn(message);
	}

	private setSecondaryOptions(secondary: object, methodName: string) {
		if (deepEqual(secondary, this.getSecondary())) {
			this.reportRedundantSetter(methodName);
		}

		const [primary] = this.#value;
		this.#value = [primary, secondary];
		return this;
	}

	private setStylelintOption(key: string, value: unknown, methodName: string) {
		if (deepEqual(this.#stylelintOptions[key], value)) {
			this.reportRedundantSetter(methodName);
		}

		this.#stylelintOptions = {
			...this.#stylelintOptions,
			[key]: value,
		};
		return this;
	}

	private setStylelintOptionsFromSplit(stylelintOptions: SecondaryOptions) {
		for (const [key, value] of Object.entries(stylelintOptions)) {
			this.setStylelintOption(key, value, `setValue("${key}")`);
		}
	}

	public get value() {
		return this.#value;
	}

	public get stylelintOptions() {
		return { ...this.#stylelintOptions };
	}

	public disable() {
		const [primary] = this.#value;
		if (primary === null) {
			this.reportRedundantSetter('disable');
		}

		this.#value = [null];
		return this;
	}

	public disableFix() {
		return this.setStylelintOption('disableFix', true, 'disableFix');
	}

	public enableFix() {
		return this.setStylelintOption('disableFix', false, 'enableFix');
	}

	public patchSecondary(secondary: object) {
		return this.setSecondaryOptions({
			...this.getSecondary(),
			...secondary,
		}, 'patchSecondary');
	}

	public setPrimary(primary: unknown) {
		const [currentPrimary, secondary] = this.#value;
		const nextPrimary = isFunction(primary) ? primary(deepClone(currentPrimary)) : primary;
		if (isUndefined(nextPrimary)) return this;

		if (deepEqual(nextPrimary, currentPrimary)) {
			this.reportRedundantSetter('setPrimary');
		}

		this.#value = secondary === undefined ? [nextPrimary] : [nextPrimary, secondary];
		return this;
	}

	public setSecondary(secondary: object | ((secondary: SecondaryOptions) => object | void)) {
		const currentSecondary = this.getSecondary();
		const nextSecondary = isFunction(secondary)
			? secondary({ ...currentSecondary })
			: secondary;

		if (nextSecondary === undefined) {
			return this;
		}

		return this.setSecondaryOptions(nextSecondary, 'setSecondary');
	}

	public setSeverity(severity: 'error' | 'warning') {
		return this.setStylelintOption('severity', severity, 'setSeverity');
	}

	public setStylelintOptions(options: object) {
		const { stylelintOptions } = splitSecondaryOptions(options);

		for (const [key, value] of Object.entries(stylelintOptions)) {
			this.setStylelintOption(key, value, `setStylelintOptions("${key}")`);
		}

		return this;
	}

	public setValue(value: NormalizedRuleValue) {
		const [primary, secondary] = value;
		const { ruleSecondary, stylelintOptions } = splitSecondaryOptions(secondary);
		const nextValue = toRuleValue(primary, ruleSecondary);

		if (deepEqual(nextValue, this.#value) && !this.haveStylelintOptionChanges(stylelintOptions)) {
			this.reportRedundantSetter('setValue');
		}

		this.#value = nextValue;
		this.setStylelintOptionsFromSplit(stylelintOptions);

		return this;
	}

	public toRuleSetting(): RuleSetting {
		const [primary] = this.#value;
		if (primary === null) return null;

		const mergedSecondary = {
			...this.getSecondary(),
			...this.#stylelintOptions,
		};

		return hasOptions(mergedSecondary)
			? [primary, mergedSecondary] as RuleSetting
			: primary as RuleSetting;
	}
}

export { RuleBuilder };
