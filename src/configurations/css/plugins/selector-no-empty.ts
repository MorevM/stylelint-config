// Original package: https://www.npmjs.com/package/stylelint-selector-no-empty
// This is a rewritten version because the original package is no longer maintained.

import stylelint from 'stylelint';
import type { Root, Rule } from 'postcss';

type ReportErrorOptions = {
	nearestSelector: string;
	result: stylelint.PostcssResult;
	rule: Rule;
};

type ReportError = (options: ReportErrorOptions) => void;

const getSplittedSelectors = (splittedSelectors: string[], splitBy: string) => {
	return splittedSelectors.flatMap((selector) =>
		selector
			.split(splitBy)
			.filter((part) => part.trim().length > 0));
};

const checkEmptySelector = ({
	splittedSelectors,
	result,
	rule,
	nearestSelector,
	reportError,
}: {
	nearestSelector: string;
	reportError: ReportError;
	result: stylelint.PostcssResult;
	rule: Rule;
	splittedSelectors: string[];
}) => {
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

const checkRule = ({
	rule,
	result,
	reportError,
}: {
	reportError: ReportError;
	result: stylelint.PostcssResult;
	rule: Rule;
}) => {
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

const checkRoot = (reportError: ReportError, root: Root, result: stylelint.PostcssResult) => {
	root.walkRules((rule) => {
		try {
			checkRule({ rule, result, reportError });
		} catch {
			// Preserve the original plugin behavior: skip selectors it cannot process.
		}
	});
};

const createSelectorNoEmptyPlugin = (stylelintApi: typeof stylelint) => {
	const ruleName = 'plugin/stylelint-selector-no-empty';
	const messages = stylelintApi.utils.ruleMessages(ruleName, {
		expected: (selector: string) => {
			if (selector.length > 0) {
				return `Unexpected empty selector near '${selector}'`;
			}

			return 'Unexpected empty selector';
		},
	});

	const reportError: ReportError = ({ rule, result, nearestSelector }) => {
		stylelintApi.utils.report({
			result,
			ruleName,
			message: messages.expected(nearestSelector),
			node: rule,
		});
	};

	const rule = Object.assign((enabled: boolean) => {
		if (!enabled) return () => {};

		return checkRoot.bind(null, reportError);
	}, {
		messages,
		ruleName,
	});

	return stylelintApi.createPlugin(ruleName, rule);
};

const selectorNoEmpty = createSelectorNoEmptyPlugin(stylelint);

const pluginSelectorNoEmpty = {
	plugins: [
		selectorNoEmpty,
	],
	rules: {
		'plugin/stylelint-selector-no-empty': true,
	},
};

export default pluginSelectorNoEmpty;
