import { definePreset } from '@morev/stylelint-config';

// Typecheck invalid examples separately so Stylelint only loads the executable config.
definePreset('css', {
	rules: {
		'color-hex-length': (rule) => rule.setPrimary((primary) => {
			// @ts-expect-error Primary callbacks include null when the rule is disabled.
			const activePrimary: 'long' | 'short' = primary;
			return activePrimary === 'long' ? 'short' : 'long';
		}),
		'font-weight-notation': (rule) => {
			// @ts-expect-error Unknown secondary options must remain rejected in the installed package.
			return rule.patchSecondary({ unknownOption: true });
		},
	},
});

export { default, PROPERTIES_ORDER, RULES_ORDER } from '@morev/stylelint-config';
export { default as css } from '@morev/stylelint-config/css';
export { default as scss } from '@morev/stylelint-config/scss';
