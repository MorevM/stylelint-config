import {
	buildPublicApi,
	getPublicApi,
	getQuickInfo,
	getQuickInfoTagText,
	getSemanticDiagnosticMessages,
} from './utils';
import type { IsAny } from './utils';

describe('defineConfig rules', () => {
	beforeAll(buildPublicApi);

	it('Allows CSS rules to be replaced with regular Stylelint values', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(
			definePreset('css', {
				rules: {
					'selector-type-no-unknown': null,
					'color-hex-length': ['short', { severity: 'warning' }],
				},
			}),
		);

		expect(config).toStrictEqual({
			extends: ['@morev/stylelint-config/css'],
			rules: {
				'selector-type-no-unknown': null,
				'color-hex-length': ['short', { severity: 'warning' }],
			},
		});
	});

	it('Exposes only configured @morev plugin rules in CSS presets', () => {
		const allowedSource = `
			import { defineConfig, definePreset } from '../dist/index.js';

			defineConfig(definePreset('css', {
				rules: {
					'@morev/base/no-selectors-in-at-rules': null,
				},
			}));
		`;
		const rejectedSource = `
			import { defineConfig, definePreset } from '../dist/index.js';

			defineConfig(definePreset('css', {
				rules: {
					'@morev/bem/block-variable': null,
				},
			}));
		`;
		const rejectedDiagnostics = getSemanticDiagnosticMessages(rejectedSource);

		expect(getSemanticDiagnosticMessages(allowedSource)).toStrictEqual([]);
		expect(rejectedDiagnostics.join('\n')).toContain('@morev/bem/block-variable');
	});

	it('Allows SCSS rules to be replaced with regular Stylelint values', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('scss', {
			rules: {
				'scss/at-rule-no-unknown': [true, {
					ignoreAtRules: ['tailwind'],
				}],
				'csstools/use-nesting': null,
			},
		}));

		expect(config).toStrictEqual({
			extends: ['@morev/stylelint-config'],
			rules: {
				'scss/at-rule-no-unknown': [true, {
					ignoreAtRules: ['tailwind'],
				}],
				'csstools/use-nesting': null,
			},
		});
	});

	it('Exposes CSS rule descriptions in editor quick info', () => {
		const source = `
			import { defineConfig, definePreset } from '../dist/index.js';


			defineConfig(definePreset('css', {
				rules: {
					'color-hex-length': null,
					'order/order': null,
					'plugin/no-low-performance-animation-properties': null,
				},
			}));
		`;
		const coreRuleQuickInfo = getQuickInfo(source, '\'color-hex-length\'');
		const augmentedPluginRuleQuickInfo = getQuickInfo(source, '\'order/order\'');
		const localPluginRuleQuickInfo = getQuickInfo(source, '\'plugin/no-low-performance-animation-properties\'');

		expect(coreRuleQuickInfo.documentation).toContain('Specify short or long notation for hex colors.');
		expect(coreRuleQuickInfo.tags).toContainEqual(expect.objectContaining({
			name: 'see',
			text: expect.arrayContaining([
				expect.objectContaining({
					text: expect.stringContaining('https://stylelint.io/user-guide/rules/color-hex-length'),
				}),
			]),
		}));
		expect(augmentedPluginRuleQuickInfo.documentation).toContain(
			'Specify the order of content within declaration blocks.',
		);
		expect(localPluginRuleQuickInfo.documentation).toContain(
			'Disallow low-performance animation and transition properties.',
		);
	});

	it('Exposes SCSS rule descriptions in editor quick info', () => {
		const source = `
			import { defineConfig, definePreset } from '../dist/index.js';


			defineConfig(definePreset('scss', {
				files: ['*.scss'],
				rules: {
					'scss/at-rule-no-unknown': null,
					'csstools/use-nesting': null,
				},
			}));
		`;
		const scssRuleQuickInfo = getQuickInfo(source, '\'scss/at-rule-no-unknown\'');
		const localPluginRuleQuickInfo = getQuickInfo(source, '\'csstools/use-nesting\'');

		expect(scssRuleQuickInfo.documentation).toContain('Disallow unknown at-rules.');
		expect(scssRuleQuickInfo.tags).toContainEqual(expect.objectContaining({
			name: 'see',
			text: expect.arrayContaining([
				expect.objectContaining({
					text: expect.stringContaining('https://github.com/stylelint-scss/stylelint-scss'),
				}),
			]),
		}));
		expect(localPluginRuleQuickInfo.documentation).toContain('Enforce nesting when it is possible in CSS.');
		expect(getQuickInfoTagText(localPluginRuleQuickInfo, 'see')).toContain(
			'https://github.com/csstools/stylelint-use-nesting#readme',
		);
	});

	it('Types SCSS preset rule callbacks', () => {
		const source = `
			import { defineConfig, definePreset } from '../dist/index.js';


			defineConfig(definePreset('scss', {
				rules: {
					'@stylistic/block-closing-brace-newline-after': (rule) => {
						return rule;
					},
				},
			}));
		`;
		const callbackRuleQuickInfo = getQuickInfo(source, 'rule) =>');

		expect(callbackRuleQuickInfo.display).toContain(
			'DefineConfigRuleBuilder<"scss", "@stylistic/block-closing-brace-newline-after">',
		);
	});

	it('Types setSecondary replacement objects from concrete rule options', () => {
		const source = `
			import { defineConfig, definePreset } from '../dist/index.js';


			defineConfig(definePreset('scss', {
				rules: {
					'@stylistic/block-closing-brace-newline-after': (rule) => {
						const [, secondary] = rule.value;
						const atRules = secondary.ignoreAtRules;

						return rule.setSecondary({
							...secondary,
							ignoreAtRules: atRules,
						});
					},
				},
			}));
		`;
		const atRulesQuickInfo = getQuickInfo(source, 'atRules =');

		expect(atRulesQuickInfo.display).not.toContain(': any');
	});

	it('Types setSecondary callbacks from concrete rule options', () => {
		const source = `
			import { defineConfig, definePreset } from '../dist/index.js';


			defineConfig(definePreset('scss', {
				rules: {
					'scss/at-rule-no-unknown': (rule) => {
						return rule.setSecondary((secondary) => {
							if (secondary.ignoreAtRules.includes('tailwind')) return;

							return {
								...secondary,
								ignoreAtRules: [...secondary.ignoreAtRules, 'tailwind'],
							};
						});
					},
				},
			}));
		`;
		const callbackSecondaryQuickInfo = getQuickInfo(source, 'secondary) =>');

		expect(callbackSecondaryQuickInfo.display).not.toContain(': any');
		expect(getSemanticDiagnosticMessages(source)).toStrictEqual([]);
	});

	it('Allows CSS rule defaults to be transformed with chainable builders', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('css', {
			rulesDiagnostics: 'off',
			rules: {
				'color-hex-length': (rule) => {
					const [primary] = rule.value;
					type HasSetSecondary = 'setSecondary' extends keyof typeof rule ? true : false;

					expectTypeOf<HasSetSecondary>().toEqualTypeOf<false>();

					expect(rule.value).toStrictEqual(['long']);
					expect(rule.stylelintOptions).toStrictEqual({ severity: 'warning' });

					return rule.setPrimary(primary === 'long' ? 'short' : 'long');
				},
				'font-weight-notation': (rule) => {
					const [primary, secondary] = rule.value;

					expect(rule.value).toStrictEqual(['numeric', {
						ignore: ['relative'],
					}]);
					expect(rule.stylelintOptions).toStrictEqual({ severity: 'warning' });

					return rule
						.setValue([primary, {
							ignore: [...secondary.ignore, 'named'],
						}])
						.setStylelintOptions({ reportDisables: true })
						.setSeverity('warning')
						.disableFix();
				},
				'declaration-block-no-redundant-longhand-properties': (rule) => {
					const [, secondary] = rule.value;
					type HasSetSecondary = 'setSecondary' extends keyof typeof rule ? true : false;

					expectTypeOf<HasSetSecondary>().toEqualTypeOf<true>();

					return rule
						.setSecondary({
							...secondary,
							ignoreShorthands: [
								...secondary.ignoreShorthands,
								'columns',
							],
						})
						.setSeverity('warning');
				},
				'property-no-vendor-prefix': (rule) => {
					const [, secondary] = rule.value;

					return rule
						.setSecondary({
							...secondary,
							ignoreProperties: [
								...secondary.ignoreProperties,
								'-webkit-appearance',
							],
						})
						.setSeverity('error')
						.enableFix();
				},
				'selector-type-no-unknown': (rule) => rule.disable(),
			},
		}));

		expect(config.rules).toStrictEqual({
			'color-hex-length': ['short', {
				severity: 'warning',
			}],
			'font-weight-notation': ['numeric', {
				ignore: ['relative', 'named'],
				reportDisables: true,
				severity: 'warning',
				disableFix: true,
			}],
			'declaration-block-no-redundant-longhand-properties': [true, {
				ignoreShorthands: [
					'/grid/',
					'flex-flow',
					'place-items',
					'/transition/',
					'columns',
				],
				severity: 'warning',
			}],
			'property-no-vendor-prefix': [true, {
				ignoreProperties: [
					'-webkit-text-size-adjust',
					'-webkit-text-decoration',
					'-webkit-appearance',
				],
				severity: 'error',
				disableFix: false,
			}],
			'selector-type-no-unknown': null,
		});
	});

	it('Warns about redundant CSS rule builder setters by default', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

		defineConfig(definePreset('css', {
			rules: {
				'color-hex-length': (rule) => rule.setSeverity('warning'),
			},
		}));

		expect(warn).toHaveBeenCalledWith(
			'@morev/stylelint-config: "color-hex-length" rule setSeverity() received a value equal to the current config.',
		);

		warn.mockRestore();
	});

	it('Allows CSS rule builder diagnostics to be disabled or raised to errors', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

		defineConfig(definePreset('css', {
			rulesDiagnostics: 'off',
			rules: {
				'color-hex-length': (rule) => rule.setSeverity('warning'),
			},
		}));

		expect(warn).not.toHaveBeenCalled();

		warn.mockRestore();

		expect(() => defineConfig(definePreset('css', {
			rulesDiagnostics: 'error',
			rules: {
				'color-hex-length': (rule) => rule.setSeverity('warning'),
			},
		}))).toThrow(
			'@morev/stylelint-config: "color-hex-length" rule setSeverity() received a value equal to the current config.',
		);
	});

	it('Keeps primary array CSS rules normalized as a single primary value', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('css', {
			rules: {
				'plugin/selector-tag-no-without-class': (rule) => {
					const [primary] = rule.value;

					expect(primary).toStrictEqual(['div', 'span']);

					return rule.setPrimary([...primary, 'section']);
				},
			},
		}));

		expect(config.rules).toStrictEqual({
			'plugin/selector-tag-no-without-class': ['div', 'span', 'section'],
		});
	});

	it('Allows SCSS rule defaults to be transformed with chainable builders', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('scss', {
			rulesDiagnostics: 'off',
			rules: {
				'at-rule-no-unknown': (rule) => {
					type HasSetSecondary = 'setSecondary' extends keyof typeof rule ? true : false;

					expectTypeOf<HasSetSecondary>().toEqualTypeOf<true>();

					expect(rule.value).toStrictEqual([null]);

					return rule
						.setPrimary(true)
						.setSecondary({
							ignoreAtRules: ['use'],
						});
				},
				'scss/at-rule-no-unknown': (rule) => {
					const [, secondary] = rule.value;

					expect(rule.value).toStrictEqual([true, {
						ignoreAtRules: ['lost', 'include'],
					}]);
					expect(rule.stylelintOptions).toStrictEqual({});

					return rule
						.setSecondary({
							ignoreAtRules: [
								...secondary.ignoreAtRules,
								'tailwind',
							],
						})
						.disableFix();
				},
				'scss/comment-no-empty': (rule) => {
					type HasSetSecondary = 'setSecondary' extends keyof typeof rule ? true : false;

					expectTypeOf<HasSetSecondary>().toEqualTypeOf<false>();

					expect(rule.value).toStrictEqual([true]);

					return rule.disable();
				},
				'@stylistic/block-closing-brace-newline-after': (rule) => {
					const [, secondary] = rule.value;
					type IsValueAny = IsAny<typeof secondary>;

					expectTypeOf<IsValueAny>().toEqualTypeOf<false>();

					expect(secondary.ignoreAtRules).toStrictEqual(['if', 'else']);

					return rule.setSecondary({
						...secondary,
						ignoreAtRules: [
							...secondary.ignoreAtRules,
							'while',
						],
					});
				},
				'csstools/use-nesting': (rule) => {
					const [, secondary] = rule.value;

					expect(rule.value).toStrictEqual(['always', {
						syntax: 'scss',
					}]);

					return rule.setSecondary({
						...secondary,
						except: [':selection'],
					});
				},
			},
		}));

		expect(config.rules).toStrictEqual({
			'at-rule-no-unknown': [true, {
				ignoreAtRules: ['use'],
			}],
			'scss/at-rule-no-unknown': [true, {
				ignoreAtRules: ['lost', 'include', 'tailwind'],
				disableFix: true,
			}],
			'scss/comment-no-empty': null,
			'@stylistic/block-closing-brace-newline-after': ['always', {
				ignoreAtRules: ['if', 'else', 'while'],
				severity: 'warning',
			}],
			'csstools/use-nesting': ['always', {
				syntax: 'scss',
				except: [':selection'],
			}],
		});
	});

	it('Allows scoped rules to be replaced and transformed', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(
			definePreset('css', {
				files: ['*.css'],
				rules: {
					'color-hex-length': ['short', { severity: 'warning' }],
				},
			}),
			definePreset('scss', {
				files: ['*.scss'],
				rulesDiagnostics: 'off',
				rules: {
					'scss/at-rule-no-unknown': (rule) => {
						const [, secondary] = rule.value;

						return rule
							.setSecondary({
								ignoreAtRules: [
									...secondary.ignoreAtRules,
									'tailwind',
								],
							})
							.setSeverity('warning');
					},
					'csstools/use-nesting': ['always', {
						syntax: 'scss',
						except: [':selection'],
					}],
				},
			}),
		);

		expect(config).toStrictEqual({
			rules: {},
			overrides: [
				{
					files: ['*.css'],
					extends: ['@morev/stylelint-config/css'],
					rules: {
						'color-hex-length': ['short', { severity: 'warning' }],
					},
				},
				{
					files: ['*.scss'],
					extends: ['@morev/stylelint-config'],
					rules: {
						'scss/at-rule-no-unknown': [true, {
							ignoreAtRules: ['lost', 'include', 'tailwind'],
							severity: 'warning',
						}],
						'csstools/use-nesting': ['always', {
							syntax: 'scss',
							except: [':selection'],
						}],
					},
				},
			],
		});
	});
});
