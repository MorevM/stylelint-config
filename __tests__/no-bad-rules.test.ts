import { beforeAll, describe, expect, it } from 'vitest';
import cp from 'node:child_process';
import stylelintRules from 'stylelint-find-new-rules';

type RuleDeclaration = {
	name: string;
	url?: string;
};

type StylelintResult = {
	deprecated: RuleDeclaration[];
	invalid: RuleDeclaration[];
	unused: RuleDeclaration[];
};

// BEM rules are provided by the plugin but are enabled
// conditionally only through scoped component-file overrides via `defineConfig`.
const knownUnused = [
	'@morev/bem/block-variable',
	'@morev/bem/match-file-name',
	'@morev/bem/no-block-properties',
	'@morev/bem/no-chained-entities',
	'@morev/bem/no-side-effects',
	'@morev/bem/selector-pattern',
];

const toHumanReadable = (declarations: RuleDeclaration[]) =>
	declarations.map((declaration) =>
		[declaration.name, declaration.url].filter(Boolean).join(' / '));

describe('Check unused and deprecated props', () => {
	let stylelintResult: StylelintResult;

	beforeAll(async () => {
		cp.execSync('pnpm build'); // Actual stylelint config of this repo extends bundled version
		stylelintResult = await stylelintRules('./dist/configurations/scss.js');
	});

	it('Has no deprecated rules', async () => {
		expect(toHumanReadable(stylelintResult.deprecated)).toStrictEqual([]);
	});

	it('Has no invalid rules', async () => {
		expect(toHumanReadable(stylelintResult.invalid)).toStrictEqual([]);
	});

	it('Has no unknown unused rules', async () => {
		const unknownUnused = stylelintResult.unused
			.filter((declaration) => !knownUnused.includes(declaration.name));

		expect(toHumanReadable(unknownUnused)).toStrictEqual([]);
	});
});
