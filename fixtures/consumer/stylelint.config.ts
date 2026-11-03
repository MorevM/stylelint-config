import { defineConfig, definePreset } from '@morev/stylelint-config';

export default defineConfig(
	definePreset('css', {
		files: ['**/*.css'],
		rules: {
			// Switch the package's long default to short to check setPrimary(callback) in the installed package.
			'color-hex-length': (rule) => rule.setPrimary((primary) => (primary === 'long' ? 'short' : 'long')),
			'plugin/selector-tag-no-without-class': (rule) => rule.setPrimary((primary) => {
				if (!Array.isArray(primary)) return;
				return [...primary, 'section'];
			}),
			'font-weight-notation': (rule) => rule.patchSecondary({ ignore: [] }),
		},
	}),
	definePreset('scss', {
		files: ['**/*.scss'],
		rules: {
			'scss/at-rule-no-unknown': (rule) => rule.patchSecondary({ ignoreAtRules: ['tailwind'] }),
		},
	}),
	definePreset('bem', {
		files: ['src/components/**/*.scss'],
		rules: {
			'@morev/bem/match-file-name': (rule) => rule.patchSecondary({ caseSensitive: false }),
		},
	}),
);
