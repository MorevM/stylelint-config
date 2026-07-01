import { beforeAll, describe, expect, it } from 'vitest';
import cp from 'node:child_process';
import { isString } from '@morev/utils';
import type { Config } from 'stylelint';
import type { RuleOrderItem } from '../src/shared';

type PublicApi = typeof import('../src');

let publicApi: PublicApi;

const getOrderRule = (config: Config) => config.rules?.['order/order'] as [RuleOrderItem[], { severity: string }];
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
