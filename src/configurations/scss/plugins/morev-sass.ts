import morevStylelintPlugin, { createDefineRules } from '@morev/stylelint-plugin';

const defineRules = createDefineRules({});

export default {
	plugins: morevStylelintPlugin,
	rules: defineRules({
		// Reports SASS variables that are declared but not used.
		// https://morevm.github.io/stylelint-plugin/rules/sass/no-unused-variables.html
		'@morev/sass/no-unused-variables': [true, {
			checkRoot: true,
			ignore: ['b'],
		}],
	}),
};
