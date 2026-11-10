import {
	getAtRules,
	getOrderRule,
	getPublicApi,
	loadPublicApi,
} from './utils';

describe('defineConfig order', () => {
	beforeAll(loadPublicApi);

	it('Allows order groups to be replaced or transformed', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const customMediaQuery = { type: 'at-rule' as const, name: 'media', parameter: '\(--custom\)' };
		const config = defineConfig(definePreset('scss', {
			order: {
				blockMixins: [],
				containerQueries: [],
				mediaQueries: (mediaQueries) => [customMediaQuery, ...mediaQueries],
				mixins: [],
			},
		}));

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
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('scss', {
			order: {
				blockMixins: ['responsive.grid'],
				containerQueries: ['sidebar (inline-size > 40rem)'],
				mediaQueries: ['--wide', '(--already-wrapped)'],
				mixins: ['theme-dark($value)'],
			},
		}));

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
		const { defineConfig, definePreset } = getPublicApi();
		const mediaQueryMatcher = {
			type: 'at-rule' as const,
			name: 'media',
			parameter: /--fluid/,
		};
		const config = defineConfig(definePreset('scss', {
			order: {
				mediaQueries: [mediaQueryMatcher],
			},
		}));

		const [order] = getOrderRule(config);

		expect(order).toContainEqual(mediaQueryMatcher);
		expect(order).toContainEqual({ type: 'at-rule', name: 'media' });
	});

	it('Ignores non-configurable order groups at runtime', () => {
		const { defineConfig, definePreset } = getPublicApi();
		const config = defineConfig(definePreset('scss', {
			order: {
				pseudoClasses: [],
			} as never,
		}));

		const orderRule = getOrderRule(config);
		const [order] = orderRule;

		expect(order).toContainEqual({ type: 'rule', selector: '&:hover,?' });
	});
});
