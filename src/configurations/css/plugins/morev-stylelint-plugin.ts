import morevStylelintPlugin, { createDefineRules } from '@morev/stylelint-plugin';

const defineRules = createDefineRules({});

export default {
	plugins: morevStylelintPlugin,
	rules: defineRules({
		// Disallows placing rules (selectors) inside at-rules
		// https://morevm.github.io/stylelint-plugin/rules/base/no-selectors-in-at-rules.html
		'@morev/base/no-selectors-in-at-rules': [true, {
			ignore: {
				'media': ['print'],
				'at-root': '',
				'layer': '*',
			},
		}],
	}),
};
