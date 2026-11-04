import morevStylelintPlugin from '@morev/stylelint-plugin';
import stylelint from 'stylelint';
import { getPublicApi, loadPublicApi } from './utils';
import type { Config } from 'stylelint';

describe('defineConfig core', () => {
	beforeAll(loadPublicApi);

	it('Creates valid configs with or without a preset', () => {
		const { defineConfig, definePreset } = getPublicApi();

		expect(defineConfig()).toStrictEqual({ rules: {} });
		expect(defineConfig(definePreset('scss'))).toStrictEqual({
			rules: {},
			extends: ['@morev/stylelint-config'],
		});
	});

	it('Creates preset config parts', () => {
		const { defineConfig, definePreset } = getPublicApi();

		expect(defineConfig(definePreset('css'))).toStrictEqual({
			rules: {},
			extends: ['@morev/stylelint-config/css'],
		});

		expect(defineConfig(definePreset('scss'))).toStrictEqual({
			rules: {},
			extends: ['@morev/stylelint-config'],
		});
	});

	it('Flattens scoped config parts for mixed repositories', () => {
		const { defineConfig, definePreset } = getPublicApi();

		expect(defineConfig(
			definePreset('css', { files: ['*.css'] }),
			definePreset('scss', { files: ['*.scss'] }),
		)).toStrictEqual({
			rules: {},
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
		});
	});

	it.each(['css', 'scss'])('Lints scoped %s presets with Stylelint', async (syntax) => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(
			definePreset('css', { files: ['*.css'] }),
			definePreset('scss', { files: ['*.scss'] }),
		);
		const { results } = await stylelint.lint({
			code: '.component { color: #ggg; }\n',
			codeFilename: `mixed-project/test.${syntax}`,
			config: config as Config,
		});

		expect(results[0].warnings).toContainEqual(expect.objectContaining({
			rule: 'color-no-invalid-hex',
		}));
	});

	it('Allows scoped order and BEM preset parts', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(
			definePreset('scss', {
				files: ['*.scss'],
				order: {
					mediaQueries: [],
				},
			}),
			definePreset('bem', {
				files: ['src/components/**/*.scss'],
			}),
		);

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
					plugins: morevStylelintPlugin,
					rules: {
						'@morev/bem/block-variable': [true, expect.objectContaining({
							firstChild: true,
							replaceBlockName: true,
						})],
					},
				},
			],
		});
	});

	it('Merges additional Stylelint config parts after preset parts', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(
			definePreset('css', { files: ['*.css'] }),
			definePreset('scss', { files: ['*.scss'] }),
			definePreset('bem', {
				files: ['src/components/**/*.scss'],
			}),
			{
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
			},
			{
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
			},
		);

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
					plugins: morevStylelintPlugin,
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

	it('Keeps the root entrypoint focused and config defaults on subpaths', async () => {
		const publicApi = getPublicApi();
		const [cssApi, scssApi] = await Promise.all([
			import('../../dist/configurations/css.js'),
			import('../../dist/configurations/scss.js'),
		]);

		expect(publicApi.default).toStrictEqual(scssApi.default);
		expect(publicApi).toHaveProperty('defineConfig');
		expect(publicApi).toHaveProperty('definePreset');
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
		const { defineConfig, definePreset } = getPublicApi();

		expect(defineConfig()).not.toHaveProperty('files');
		expect(defineConfig(definePreset('css'))).not.toHaveProperty('files');
		expect(defineConfig(definePreset('scss', {
			files: ['*.scss'],
			order: {
				mediaQueries: [],
			},
		}))).not.toHaveProperty('files');
	});

	it('Merges additional Stylelint config parts after generated values', () => {
		const { RULES_ORDER, defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('scss', {
			order: {
				mediaQueries: [],
			},
		}), {
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
