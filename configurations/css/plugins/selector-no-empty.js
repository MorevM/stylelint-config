// Original package: https://www.npmjs.com/package/stylelint-selector-no-empty
// This is a rewritten version because the original package is no longer maintained.
// TODO: When migrating to TS, replace inspectSelectorNoEmptyPlugin with a cleaner build-time inline code strategy.

import { inspect } from 'node:util';
import stylelint from 'stylelint';

const getSplittedSelectors = (splittedSelectors, splitBy) => {
	return splittedSelectors.flatMap((selector) =>
		selector
			.split(splitBy)
			.filter((part) => part.trim().length > 0));
};

const checkEmptySelector = ({ splittedSelectors, result, rule, nearestSelector, reportError }) => {
	for (const splittedSelector of splittedSelectors) {
		let selectorPart = splittedSelector;

		if ((selectorPart.startsWith('.') || selectorPart.startsWith('#')) && selectorPart.trim().length > 1) {
			selectorPart = selectorPart.slice(1);
		}

		const classSelectorsWithoutDot = selectorPart.split('.');

		for (const classSelectorWithoutDot of classSelectorsWithoutDot) {
			const idSelectorsWithoutPound = classSelectorWithoutDot.split('#');

			for (const selector of idSelectorsWithoutPound) {
				if (selector.trim().length === 0) {
					reportError({ rule, result, nearestSelector });
					return;
				}
			}
		}
	}
};

const checkRule = ({ rule, result, reportError }) => {
	let nearestSelector = '';

	rule.selector.split(',').forEach((selector) => {
		const trimmedSelector = selector.trim();

		if (trimmedSelector.length === 0) {
			reportError({ rule, result, nearestSelector });
			return;
		}

		nearestSelector = trimmedSelector;

		const tabSplittedSelectors = getSplittedSelectors(trimmedSelector.split('\n'), '\t');
		const spaceSplittedSelectors = getSplittedSelectors(tabSplittedSelectors, ' ');

		checkEmptySelector({
			splittedSelectors: spaceSplittedSelectors,
			result,
			rule,
			nearestSelector,
			reportError,
		});
	});
};

const checkRoot = (reportError, root, result) => {
	root.walkRules((rule) => {
		try {
			checkRule({ rule, result, reportError });
		} catch {
			// Preserve the original plugin behavior: skip selectors it cannot process.
		}
	});
};

const createSelectorNoEmptyPlugin = (stylelintApi) => {
	const ruleName = 'plugin/stylelint-selector-no-empty';
	const messages = stylelintApi.utils.ruleMessages(ruleName, {
		expected: (selector) => {
			if (selector.length > 0) {
				return `Unexpected empty selector near '${selector}'`;
			}

			return 'Unexpected empty selector';
		},
	});

	const reportError = ({ rule, result, nearestSelector }) => {
		stylelintApi.utils.report({
			result,
			ruleName,
			message: messages.expected(nearestSelector),
			node: rule,
		});
	};

	return stylelintApi.createPlugin(ruleName, (enabled) => {
		if (!enabled) return;

		return checkRoot.bind(null, reportError);
	});
};

const selectorNoEmpty = createSelectorNoEmptyPlugin(stylelint);

const inspectSelectorNoEmptyPlugin = () => [
	'((stylelintApi) => {',
	`const getSplittedSelectors = ${getSplittedSelectors.toString()};`,
	`const checkEmptySelector = ${checkEmptySelector.toString()};`,
	`const checkRule = ${checkRule.toString()};`,
	`const checkRoot = ${checkRoot.toString()};`,
	`const createSelectorNoEmptyPlugin = ${createSelectorNoEmptyPlugin.toString()};`,
	'return createSelectorNoEmptyPlugin(stylelintApi);',
	"})((await import('stylelint')).default)",
].join('\n');

selectorNoEmpty[inspect.custom] = inspectSelectorNoEmptyPlugin;

const pluginSelectorNoEmpty = {
	plugins: [
		selectorNoEmpty,
	],
	rules: {
		'plugin/stylelint-selector-no-empty': true,
	},
};

export default pluginSelectorNoEmpty;
