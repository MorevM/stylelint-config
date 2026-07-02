import cp from 'node:child_process';
import { isString } from '@morev/utils';
import type { Config } from 'stylelint';
import type { RuleOrderItem } from '#shared';

type PublicApi = typeof import('#index');

let publicApi: PublicApi;

const getOrderRule = (config: Config) => config.rules?.['order/order'] as [RuleOrderItem[], { severity: string }];
const getBemOverride = (config: Config) => config.overrides?.[0] as NonNullable<Config['overrides']>[number];
const getAtRules = (order: RuleOrderItem[], name: string, hasBlock?: boolean) =>
	order.filter((item) =>
		!isString(item)
		&& item.type === 'at-rule'
		&& item.name === name
		&& (hasBlock === undefined || item.hasBlock === hasBlock));

describe('defineConfig', () => {
	beforeAll(async () => {
		cp.execSync('pnpm build'); // Verify the same public entrypoint consumers import from the package
		publicApi = await import('../dist/index.js') as PublicApi;
	});

	it('Returns a config extending the default preset', () => {
		const { defineConfig } = publicApi;

		expect(defineConfig()).toStrictEqual({
			extends: ['@morev/stylelint-config'],
		});
	});

	it('Allows choosing a preset', () => {
		const { defineConfig } = publicApi;

		expect(defineConfig({ preset: 'css' })).toStrictEqual({
			extends: ['@morev/stylelint-config/css'],
		});

		expect(defineConfig({ preset: 'scss' })).toStrictEqual({
			extends: ['@morev/stylelint-config'],
		});
	});

	it('Creates scoped targets for mixed repositories', () => {
		const { defineConfig } = publicApi;

		expect(defineConfig({
			targets: [
				{ files: ['*.css'], preset: 'css' },
				{ files: ['*.scss'], preset: 'scss' },
			],
		})).toStrictEqual({
			overrides: [
				{
					files: ['*.css'],
					extends: ['@morev/stylelint-config/css'],
				},
				{
					files: ['*.scss'],
					extends: ['@morev/stylelint-config'],
				},
			],
			rules: {},
		});
	});

	it('Allows target-local order and BEM options', () => {
		const { defineConfig } = publicApi;
		const config = defineConfig({
			targets: [
				{
					files: ['*.scss'],
					preset: 'scss',
					order: {
						mediaQueries: [],
					},
					bem: {
						files: ['src/components/**/*.scss'],
					},
				},
			],
		});

		expect(config).toMatchObject({
			overrides: [
				{
					files: ['*.scss'],
					extends: ['@morev/stylelint-config'],
					rules: {
						'order/order': [
							expect.arrayContaining([{ type: 'at-rule', name: 'media' }]),
							{ severity: 'warning' },
						],
					},
				},
				{
					files: ['src/components/**/*.scss'],
					plugins: ['@morev/stylelint-plugin'],
					rules: {
						'@morev/bem/block-variable': [true, expect.objectContaining({
							firstChild: true,
							replaceBlockName: true,
						})],
					},
				},
			],
			rules: {},
		});
	});

	it('Merges additional Stylelint config parts after global BEM options in target configs', () => {
		const { defineConfig } = publicApi;
		const config = defineConfig({
			targets: [
				{ files: ['*.css'], preset: 'css' },
				{ files: ['*.scss'], preset: 'scss' },
			],
			bem: {
				files: ['src/components/**/*.scss'],
			},
		}, {
			extends: ['stylelint-config-standard'],
			overrides: [
				{
					files: ['legacy/**/*.scss'],
					rules: {
						'color-no-invalid-hex': null,
					},
				},
			],
			rules: {
				'selector-max-id': null,
			},
		}, {
			extends: ['stylelint-config-recess-order'],
			overrides: [
				{
					files: ['vendor/**/*.css'],
					rules: {
						'selector-class-pattern': null,
					},
				},
			],
			rules: {
				'block-no-empty': null,
			},
		});

		expect(config).toMatchObject({
			extends: [
				'stylelint-config-standard',
				'stylelint-config-recess-order',
			],
			overrides: [
				{
					files: ['*.css'],
					extends: ['@morev/stylelint-config/css'],
				},
				{
					files: ['*.scss'],
					extends: ['@morev/stylelint-config'],
				},
				{
					files: ['src/components/**/*.scss'],
					plugins: ['@morev/stylelint-plugin'],
					rules: {
						'@morev/bem/block-variable': [true, expect.objectContaining({
							firstChild: true,
							replaceBlockName: true,
						})],
					},
				},
				{
					files: ['legacy/**/*.scss'],
					rules: {
						'color-no-invalid-hex': null,
					},
				},
				{
					files: ['vendor/**/*.css'],
					rules: {
						'selector-class-pattern': null,
					},
				},
			],
			rules: {
				'selector-max-id': null,
				'block-no-empty': null,
			},
		});
	});

	it('Disallows combining preset and targets', () => {
		const { defineConfig } = publicApi;

		expect(() => defineConfig({
			preset: 'scss',
			targets: [],
		} as never)).toThrow('`preset` and `targets` options are mutually exclusive.');
	});

	it('Keeps the root entrypoint focused and config defaults on subpaths', async () => {
		const [cssApi, scssApi] = await Promise.all([
			import('../dist/configurations/css.js'),
			import('../dist/configurations/scss.js'),
		]);

		expect(publicApi.default).toStrictEqual(scssApi.default);
		expect(publicApi).toHaveProperty('defineConfig');
		expect(publicApi).toHaveProperty('PROPERTIES_ORDER');
		expect(publicApi).toHaveProperty('RULES_ORDER');
		expect(publicApi).not.toHaveProperty('RULES_ORDER_GROUPS');
		expect(cssApi).toHaveProperty('default');
		expect(cssApi).not.toHaveProperty('defineConfig');
		expect(cssApi).not.toHaveProperty('RULES_ORDER');
		expect(scssApi).toHaveProperty('default');
		expect(scssApi).not.toHaveProperty('defineConfig');
		expect(scssApi).not.toHaveProperty('RULES_ORDER');
	});

	it('Does not add a `files` property to generated configs', () => {
		const { defineConfig } = publicApi;

		expect(defineConfig()).not.toHaveProperty('files');
		expect(defineConfig({ preset: 'css' })).not.toHaveProperty('files');
		expect(defineConfig({
			order: {
				mediaQueries: [],
			},
		})).not.toHaveProperty('files');
	});

	it('Allows order groups to be replaced or transformed', () => {
		const { defineConfig } = publicApi;
		const customMediaQuery = { type: 'at-rule' as const, name: 'media', parameter: '\(--custom\)' };
		const config = defineConfig({
			order: {
				blockMixins: [],
				containerQueries: [],
				mediaQueries: (mediaQueries) => [customMediaQuery, ...mediaQueries],
				mixins: [],
			},
		});

		const orderRule = getOrderRule(config);
		const [order] = orderRule;

		expect(orderRule[1]).toStrictEqual({ severity: 'warning' });
		expect(order).toContainEqual(customMediaQuery);
		expect(order).toContainEqual({ type: 'at-rule', name: 'extend' });
		expect(order).toContainEqual({ type: 'at-rule', name: 'container' });
		expect(order).toContainEqual({ type: 'at-rule', name: 'include', hasBlock: true });
		expect(order).toContainEqual({ type: 'at-rule', name: 'include', hasBlock: false });
	});

	it('Wraps string shortcuts for named at-rule groups', () => {
		const { defineConfig } = publicApi;
		const config = defineConfig({
			order: {
				blockMixins: ['responsive.grid'],
				containerQueries: ['sidebar (inline-size > 40rem)'],
				mediaQueries: ['--wide', '(--already-wrapped)'],
				mixins: ['theme-dark($value)'],
			},
		});

		const orderRule = getOrderRule(config);
		const [order] = orderRule;

		expect(order).toContainEqual({ type: 'at-rule', name: 'container', parameter: 'sidebar \\(inline-size > 40rem\\)' });
		expect(order).toContainEqual({ type: 'at-rule', name: 'media', parameter: '\\(--wide\\)' });
		expect(order).toContainEqual({ type: 'at-rule', name: 'media', parameter: '\\(--already-wrapped\\)' });
		expect(order).toContainEqual({ type: 'at-rule', name: 'include', hasBlock: true, parameter: 'responsive\\.grid' });
		expect(order).toContainEqual({ type: 'at-rule', name: 'include', hasBlock: false, parameter: 'theme-dark\\(\\$value\\)' });
		expect(getAtRules(order, 'container')).toStrictEqual([
			{ type: 'at-rule', name: 'container', parameter: 'sidebar \\(inline-size > 40rem\\)' },
			{ type: 'at-rule', name: 'container' },
		]);
		expect(getAtRules(order, 'media')).toStrictEqual([
			{ type: 'at-rule', name: 'media', parameter: '\\(--wide\\)' },
			{ type: 'at-rule', name: 'media', parameter: '\\(--already-wrapped\\)' },
			{ type: 'at-rule', name: 'media' },
		]);
		expect(getAtRules(order, 'include', true)).toStrictEqual([
			{ type: 'at-rule', name: 'include', hasBlock: true, parameter: 'responsive\\.grid' },
			{ type: 'at-rule', name: 'include', hasBlock: true },
		]);
		expect(getAtRules(order, 'include', false)).toStrictEqual([
			{ type: 'at-rule', name: 'include', hasBlock: false, parameter: 'theme-dark\\(\\$value\\)' },
			{ type: 'at-rule', name: 'include', hasBlock: false },
		]);
		expect(order).not.toContain('--wide');
		expect(order).not.toContain('sidebar (inline-size > 40rem)');
		expect(order).not.toContain('responsive.grid');
		expect(order).not.toContain('theme-dark($value)');
	});

	it('Preserves explicit RegExp order matcher objects', () => {
		const { defineConfig } = publicApi;
		const mediaQueryMatcher = {
			type: 'at-rule' as const,
			name: 'media',
			parameter: /--fluid/,
		};
		const config = defineConfig({
			order: {
				mediaQueries: [mediaQueryMatcher],
			},
		});

		const [order] = getOrderRule(config);

		expect(order).toContainEqual(mediaQueryMatcher);
		expect(order).toContainEqual({ type: 'at-rule', name: 'media' });
	});

	it('Ignores non-configurable order groups at runtime', () => {
		const { defineConfig } = publicApi;
		const config = defineConfig({
			order: {
				pseudoClasses: [],
			} as never,
		});

		const orderRule = getOrderRule(config);
		const [order] = orderRule;

		expect(order).toContainEqual({ type: 'rule', selector: '&:hover,?' });
	});

	it('Adds BEM rules only for configured component files', () => {
		const { defineConfig } = publicApi;
		const config = defineConfig({
			bem: {
				files: ['src/components/**/*.scss'],
			},
		});
		const bemOverride = getBemOverride(config);

		expect(bemOverride.files).toStrictEqual(['src/components/**/*.scss']);
		expect(bemOverride.plugins).toStrictEqual(['@morev/stylelint-plugin']);
		expect(bemOverride.rules?.['@morev/bem/block-variable']).toStrictEqual([true, {
			name: 'b',
			interpolation: 'always',
			firstChild: true,
			replaceBlockName: true,
			separators: undefined,
		}]);
	});

	it('Allows BEM rule defaults to be replaced directly', () => {
		const { defineConfig } = publicApi;
		const config = defineConfig({
			bem: {
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
			},
		});
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

	it('Allows BEM rule defaults to be transformed with bound merge helpers', () => {
		const { defineConfig } = publicApi;
		const separators = {
			element: '__',
			modifier: '--',
			modifierValue: '_',
		};
		const config = defineConfig({
			bem: {
				files: 'src/components/**/*.scss',
				separators,
				rules: {
					'@morev/bem/match-file-name': (rule) => {
						expect(rule.value).toStrictEqual([true, {
							caseSensitive: true,
							matchDirectory: false,
						}]);

						return rule.merge({
							caseSensitive: false,
						});
					},
					'@morev/bem/no-block-properties': (rule) => rule.merge({
						allowProperties: ['position'],
					}),
				},
			},
		});
		const bemOverride = getBemOverride(config);

		expect(bemOverride.rules?.['@morev/bem/match-file-name']).toStrictEqual([true, {
			caseSensitive: false,
			matchDirectory: false,
			separators,
		}]);

		expect(bemOverride.rules?.['@morev/bem/no-block-properties']).toStrictEqual([true, {
			presets: ['EXTERNAL_GEOMETRY', 'CONTEXTUAL', 'POSITIONING'],
			allowProperties: ['position'],
			ignoreBlocks: [],
			separators,
		}]);
	});

	it('Merges additional Stylelint config parts after generated values', () => {
		const { RULES_ORDER, defineConfig } = publicApi;
		const config = defineConfig({
			order: {
				mediaQueries: [],
			},
		}, {
			extends: ['@morev/stylelint-config/css'],
			rules: {
				'order/order': RULES_ORDER,
				'selector-max-id': null,
			},
		});

		expect(config.extends).toStrictEqual([
			'@morev/stylelint-config',
			'@morev/stylelint-config/css',
		]);
		expect(config.rules?.['order/order']).toBe(RULES_ORDER);
		expect(config.rules?.['selector-max-id']).toBeNull();
	});
});
