import morevStylelintPlugin from '@morev/stylelint-plugin';
import {
	buildPublicApi,
	getBemOverride,
	getCompletions,
	getPublicApi,
	getQuickInfo,
	getQuickInfoTagText,
	getSemanticDiagnosticMessages,
} from './utils';
import type { IsAny } from './utils';

describe('defineConfig BEM', () => {
	beforeAll(buildPublicApi);

	it('Adds BEM rules only for configured component files', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(
			definePreset('bem', {
				files: ['src/components/**/*.scss'],
			}),
		);
		const bemOverride = getBemOverride(config);

		expect(bemOverride).toMatchObject({
			files: ['src/components/**/*.scss'],
			plugins: morevStylelintPlugin,
			rules: {
				'@morev/bem/block-variable': [true, {
					name: 'b',
					interpolation: 'always',
					firstChild: true,
					replaceBlockName: true,
					separators: undefined,
				}],
			},
		});
	});

	it('Allows BEM rule defaults to be replaced directly', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(
			definePreset('bem', {
				files: 'src/components/**/*.scss',
				rules: {
					'@morev/bem/match-file-name': null,
					'@morev/bem/no-side-effects': [true, {
						ignore: ['.swiper-*'],
					}],
					'@morev/sass/no-unused-variables': [true, {
						checkRoot: true,
						ignore: ['b'],
					}],
				},
			}),
		);
		const bemOverride = getBemOverride(config);

		expect(bemOverride.rules?.['@morev/bem/match-file-name']).toStrictEqual([null, {
			separators: undefined,
		}]);
		expect(bemOverride.rules?.['@morev/bem/no-side-effects']).toStrictEqual([true, {
			ignore: ['.swiper-*'],
			separators: undefined,
		}]);
		expect(bemOverride.rules?.['@morev/sass/no-unused-variables']).toStrictEqual([true, {
			checkRoot: true,
			ignore: ['b'],
		}]);
	});

	it.each([
		['@morev/bem/selector-pattern', 'Enforces naming patterns for BEM entities.'],
		[
			'@morev/bem/no-side-effects',
			'Disallows selectors that apply styles outside the scope of the current BEM block.',
		],
		[
			'@morev/bem/no-chained-entities',
			'Disallows splitting BEM entities across multiple chained `&` selectors in SCSS.',
		],
		[
			'@morev/bem/no-block-properties',
			'Prevents layout-affecting CSS properties within BEM block selectors.',
		],
		[
			'@morev/bem/match-file-name',
			'Requires the file name to begin with the name of the BEM block it represents.',
		],
		[
			'@morev/bem/block-variable',
			"Requires the component's root selector to define a variable referencing the block name.",
		],
	])('Exposes descriptions and documentation links for %s', (ruleName, description) => {
		const source = `
			import { defineConfig, definePreset } from '../dist/index.js';

			defineConfig(definePreset('bem', {
				files: ['src/components/**/*.scss'],
				rules: {
					'${ruleName}': (rule) => rule,
				},
			}));
		`;
		const ruleQuickInfo = getQuickInfo(source, `'${ruleName}'`);

		expect(ruleQuickInfo.documentation).toBe(description);
		expect(getQuickInfoTagText(ruleQuickInfo, 'see')).toBe(
			`https://morevm.github.io/stylelint-plugin/rules/${ruleName.replace('@morev/', '')}.html`,
		);
	});

	it.each(['setSecondary', 'patchSecondary'])('Exposes BEM secondary option completions in %s', (methodName) => {
		const source = `
			import { defineConfig, definePreset } from '../dist/index.js';

			defineConfig(definePreset('bem', {
				files: ['./.playground/**/*.{css,scss}'],
				rules: {
					'@morev/bem/block-variable': (rule) => {
						return rule.${methodName}({  });
					},
				},
			}));
		`;
		const completions = getCompletions(source, `${methodName}({ `);

		expect(completions).toContain('replaceBlockName');
	});

	it('Allows BEM setter replacements to omit unchanged secondary defaults', () => {
		const source = `
			import { defineConfig, definePreset } from '../dist/index.js';

			defineConfig(definePreset('bem', {
				files: ['./.playground/**/*.{css,scss}'],
				rules: {
					'@morev/bem/block-variable': (rule) => {
						return rule.setSecondary({ firstChild: true });
					},
				},
			}));
		`;

		expect(getSemanticDiagnosticMessages(source)).toStrictEqual([]);
	});

	it('Patches BEM options without replacing unrelated secondary or Stylelint options', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('bem', {
			files: ['src/components/**/*.scss'],
			rules: {
				'@morev/bem/match-file-name': (rule) => rule
					.setSeverity('warning')
					.disableFix()
					.patchSecondary({ caseSensitive: false }),
				'@morev/bem/no-block-properties': (rule) => rule
					.patchSecondary({ presets: ['CONTEXTUAL'] }),
			},
		}));
		const bemOverride = getBemOverride(config);

		expect(bemOverride.rules?.['@morev/bem/match-file-name']).toStrictEqual([true, {
			caseSensitive: false,
			matchDirectory: false,
			severity: 'warning',
			disableFix: true,
			separators: undefined,
		}]);
		expect(bemOverride.rules?.['@morev/bem/no-block-properties']).toStrictEqual([true, {
			presets: ['CONTEXTUAL'],
			allowProperties: [],
			ignoreBlocks: [],
			separators: undefined,
		}]);
	});

	it('Allows BEM rule defaults to be transformed with chainable builders', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const separators = {
			element: '__',
			modifier: '--',
			modifierValue: '_',
		};
		const config = defineConfig(
			definePreset('bem', {
				files: 'src/components/**/*.scss',
				separators,
				rulesDiagnostics: 'off',
				rules: {
					'@morev/bem/match-file-name': (rule) => {
						const [, secondary] = rule.value;

						expect(rule.value).toStrictEqual([true, {
							caseSensitive: true,
							matchDirectory: false,
						}]);
						expect(rule.stylelintOptions).toStrictEqual({});

						return rule
							.setSecondary({
								...secondary,
								caseSensitive: false,
							})
							.setSeverity('warning')
							.disableFix();
					},
					'@morev/bem/no-block-properties': (rule) => {
						const [, secondary] = rule.value;
						type IsValueAny = IsAny<typeof secondary>;

						expectTypeOf<IsValueAny>().toEqualTypeOf<false>();

						return rule.setSecondary({
							...secondary,
							allowProperties: [
								...secondary.allowProperties,
								'position',
							],
						});
					},
				},
			}),
		);
		const bemOverride = getBemOverride(config);

		expect(bemOverride.rules?.['@morev/bem/match-file-name']).toStrictEqual([true, {
			caseSensitive: false,
			matchDirectory: false,
			severity: 'warning',
			disableFix: true,
			separators,
		}]);

		expect(bemOverride.rules?.['@morev/bem/no-block-properties']).toStrictEqual([true, {
			presets: ['EXTERNAL_GEOMETRY', 'CONTEXTUAL', 'POSITIONING'],
			allowProperties: ['position'],
			ignoreBlocks: [],
			separators,
		}]);
	});
});
