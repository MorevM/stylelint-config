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

	it('Types primary callbacks and rejects invalid replacement values', () => {
		const acceptedSource = `
			import { defineConfig, definePreset } from '../dist/index.js';

			defineConfig(definePreset('css', {
				rules: {
					'color-hex-length': (rule) => rule.disable().setPrimary((primary) => {
						const current: 'long' | 'short' | null = primary;
						return current === 'long' ? 'short' : 'long';
					}),
					'plugin/selector-tag-no-without-class': (rule) => rule.setPrimary((primary) => {
						if (!Array.isArray(primary)) return;
						return [...primary, 'section'];
					}),
				},
			}));
		`;
		const rejectedSource = `
			import { defineConfig, definePreset } from '../dist/index.js';

			defineConfig(definePreset('css', {
				rules: {
					'color-hex-length': (rule) => rule.setPrimary(() => 'numeric'),
					'color-named': (rule) => rule.setPrimary(() => null),
					'font-weight-notation': (rule) => rule.disable().setPrimary((primary) => {
						const current: string = primary;
						return 'numeric';
					}),
				},
			}));
		`;
		const primaryQuickInfo = getQuickInfo(acceptedSource, 'primary) =>');

		expect(getSemanticDiagnosticMessages(acceptedSource)).toStrictEqual([]);
		expect(getSemanticDiagnosticMessages(rejectedSource)).toHaveLength(3);
		expect(primaryQuickInfo.display).toContain('null');
		expect(primaryQuickInfo.display).not.toContain('any');
	});

	it('Transforms the current primary while preserving secondary and Stylelint options', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('css', {
			rules: {
				'font-weight-notation': (rule) => rule
					.disableFix()
					.setPrimary('named-where-possible')
					.setPrimary((primary) => {
						expect(primary).toBe('named-where-possible');

						return 'numeric';
					}),
			},
		}));

		expect(config.rules?.['font-weight-notation']).toStrictEqual(['numeric', {
			ignore: ['relative'],
			severity: 'warning',
			disableFix: true,
		}]);
	});

	it('Clones primary arrays and nested objects before passing them to callbacks', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('css', {
			rules: {
				'plugin/selector-tag-no-without-class': (rule) => rule.setPrimary((primary) => {
					if (!Array.isArray(primary)) throw new Error('Expected primary array.');
					primary.push('section');
					return primary;
				}),
				'at-rule-property-required-list': (rule) => rule.setPrimary((primary) => {
					if (primary === null) throw new Error('Expected primary object.');
					const properties = primary['font-face'];
					if (!Array.isArray(properties)) throw new Error('Expected nested primary array.');
					properties.reverse();
					return primary;
				}),
			},
		}));

		expect(config.rules?.['plugin/selector-tag-no-without-class']).toStrictEqual(['div', 'span', 'section']);
		expect(config.rules?.['at-rule-property-required-list']).toStrictEqual({
			'font-face': ['font-family', 'font-display'],
		});

		definePreset('css', {
			rules: {
				'plugin/selector-tag-no-without-class': (rule) => {
					expect(rule.value).toStrictEqual([['div', 'span']]);
				},
				'at-rule-property-required-list': (rule) => {
					expect(rule.value).toStrictEqual([{ 'font-face': ['font-display', 'font-family'] }]);
				},
			},
		});
	});

	it('Passes null to primary callbacks after disabling a rule', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('scss', {
			rules: {
				'at-rule-no-unknown': (rule) => rule.setPrimary((primary) => {
					expect(primary).toBeNull();

					return true;
				}),
				'color-hex-length': (rule) => rule.disable().setPrimary((primary) => {
					expect(primary).toBeNull();

					return 'short';
				}),
			},
		}));

		expect(config.rules?.['at-rule-no-unknown']).toBe(true);
		expect(config.rules?.['color-hex-length']).toStrictEqual(['short', { severity: 'warning' }]);
	});

	it('Discards mutations when a primary callback returns no value', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		const config = defineConfig(definePreset('css', {
			rulesDiagnostics: 'error',
			rules: {
				'plugin/selector-tag-no-without-class': (rule) => rule.setPrimary((primary) => {
					if (Array.isArray(primary)) primary.push('section');
				}),
				'font-weight-notation': (rule) => rule.setPrimary(() => undefined),
			},
		}));

		expect(config.rules?.['plugin/selector-tag-no-without-class']).toStrictEqual(['div', 'span']);
		expect(config.rules?.['font-weight-notation']).toStrictEqual(['numeric', {
			ignore: ['relative'],
			severity: 'warning',
		}]);
		expect(warn).not.toHaveBeenCalled();

		warn.mockRestore();
	});

	it('Warns about redundant primary callback results', () => {
		const { definePreset } = getPublicApi();
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		definePreset('css', {
			rules: {
				'color-hex-length': (rule) => rule.setPrimary((primary) => primary ?? 'long'),
			},
		});

		expect(warn).toHaveBeenCalledWith(expect.stringContaining('setPrimary()'));

		warn.mockRestore();
	});

	it('Allows redundant primary callback diagnostics to be disabled or raised to errors', () => {
		const { definePreset } = getPublicApi();
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		definePreset('css', {
			rulesDiagnostics: 'off',
			rules: {
				'color-hex-length': (rule) => rule.setPrimary((primary) => primary ?? 'long'),
			},
		});

		expect(warn).not.toHaveBeenCalled();
		expect(() => definePreset('css', {
			rulesDiagnostics: 'error',
			rules: {
				'color-hex-length': (rule) => rule.setPrimary((primary) => primary ?? 'long'),
			},
		})).toThrow('setPrimary()');

		warn.mockRestore();
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

	it('Types partial secondary patches and rejects unrelated options', () => {
		const acceptedSource = `
			import { defineConfig, definePreset } from '../dist/index.js';

			defineConfig(definePreset('scss', {
				rules: {
					'scss/at-rule-no-unknown': (rule) => rule.patchSecondary({ ignoreAtRules: ['tailwind'] }),
				},
			}));
			defineConfig(definePreset('bem', {
				files: ['*.scss'],
				rules: {
					'@morev/bem/match-file-name': (rule) => rule.patchSecondary({ caseSensitive: false }),
				},
			}));
		`;
		const rejectedSource = `
			import { defineConfig, definePreset } from '../dist/index.js';

			defineConfig(definePreset('css', {
				rules: {
					'color-hex-length': (rule) => rule.patchSecondary({}),
					'font-weight-notation': (rule) => rule.patchSecondary({ ignore: 'named' }),
				},
			}));
			defineConfig(definePreset('scss', {
				rules: {
					'scss/at-rule-no-unknown': (rule) => rule.patchSecondary({ severity: 'warning' }),
				},
			}));
		`;
		const diagnostics = getSemanticDiagnosticMessages(rejectedSource);

		expect(getSemanticDiagnosticMessages(acceptedSource)).toStrictEqual([]);
		expect(diagnostics).toHaveLength(3);
		expect(diagnostics.join('\n')).toContain('patchSecondary');
		expect(diagnostics.join('\n')).toContain('severity');
	});

	it('Patches CSS secondary arrays and objects and reports redundant patches', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		const config = defineConfig(definePreset('css', {
			rules: {
				'font-weight-notation': (rule) => rule
					.patchSecondary({ ignore: ['relative'] })
					.patchSecondary({ ignore: [] }),
				'unit-allowed-list': (rule) => rule
					.setPrimary(['px'])
					.patchSecondary({ ignoreProperties: { px: ['width'] } })
					.patchSecondary({ ignoreProperties: { em: ['height'] } }),
			},
		}));

		expect(config.rules?.['font-weight-notation']).toStrictEqual(['numeric', {
			ignore: [],
			severity: 'warning',
		}]);
		expect(config.rules?.['unit-allowed-list']).toStrictEqual([['px'], {
			ignoreProperties: { em: ['height'] },
		}]);
		expect(warn).toHaveBeenCalledWith(expect.stringContaining('patchSecondary()'));

		warn.mockRestore();
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
