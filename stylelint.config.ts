import { defineConfig, definePreset } from '@morev/stylelint-config';

export default defineConfig(
	definePreset('css', { files: ['*.css'] }),
	definePreset('scss', {
		files: ['*.scss'],
		rules: {
			'@stylistic/block-opening-brace-space-after': (rule) => {
				return rule.setSecondary({
					ignore: ['at-rules'],
				});
			},
			'@stylistic/block-opening-brace-space-before': (rule) => {
				return rule.setSecondary({ ignoreAtRules: [] });
			},
		},
	}),
	definePreset('bem', {
		files: ['./.playground/**/*.{css,scss}'],
		rules: {
			'@morev/bem/block-variable': (rule) => {
				return rule.setSecondary({ firstChild: true });
			},
		},
	}),
);
