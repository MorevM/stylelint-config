import { mergeStylelintConfigs, processExports } from '#utils';

describe(mergeStylelintConfigs, () => {
	it('Merges Stylelint config parts', () => {
		const firstOverride = { files: ['*.css'] };
		const secondOverride = { files: ['*.scss'] };
		const config = mergeStylelintConfigs(
			{
				extends: '@morev/stylelint-config',
				languageOptions: {
					directionality: {
						block: 'top-to-bottom',
					},
				},
				overrides: [firstOverride],
				plugins: ['base-plugin'],
				rules: {
					'plugin/object-rule': {
						primary: true,
						secondary: {
							base: true,
						},
					},
					'plugin/tuple-rule': [true],
				},
				customArray: ['base'],
			},
			{
				extends: ['@morev/stylelint-config/css'],
				languageOptions: {
					directionality: {
						inline: 'left-to-right',
					},
				},
				overrides: [secondOverride],
				plugins: ['base-plugin', 'part-plugin'],
				rules: {
					'plugin/object-rule': {
						secondary: {
							part: true,
						},
					},
					'plugin/tuple-rule': [false],
				},
				customArray: ['part'],
			},
		);

		expect(config).toStrictEqual({
			extends: ['@morev/stylelint-config', '@morev/stylelint-config/css'],
			languageOptions: {
				directionality: {
					block: 'top-to-bottom',
					inline: 'left-to-right',
				},
			},
			overrides: [firstOverride, secondOverride],
			plugins: ['base-plugin', 'part-plugin'],
			rules: {
				'plugin/object-rule': {
					secondary: {
						part: true,
					},
				},
				'plugin/tuple-rule': [false],
			},
			customArray: ['part'],
		});
	});
});

describe(processExports, () => {
	it('Merges top-level arrays without merging rule tuples', () => {
		const config = processExports(
			{
				plugins: ['base-plugin'],
				rules: {
					'plugin/example': [true, { severity: 'warning' }],
				},
			},
			{
				plugins: ['part-plugin'],
				rules: {
					'plugin/example': [false],
				},
			},
		);

		expect(config.plugins).toStrictEqual(['base-plugin', 'part-plugin']);
		expect(config.rules).toStrictEqual({
			'plugin/example': [false],
		});
	});
});
