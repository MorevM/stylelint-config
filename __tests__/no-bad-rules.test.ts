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

const toHumanReadable = (declarations: RuleDeclaration[]) => declarations.map((declaration) =>
	[declaration.name, declaration.url].filter(Boolean).join(' / '));

describe('Check unused and deprecated props', () => {
	let stylelintResult: StylelintResult;

	beforeAll(async () => {
		cp.execSync('pnpm build'); // Actual stylelint config of this repo extends bundled version
		stylelintResult = await stylelintRules('./build/configurations/scss.js');
	});

	it('Has no deprecated rules', async () => {
		expect(toHumanReadable(stylelintResult.deprecated)).toStrictEqual([]);
	});

	it('Has no invalid rules', async () => {
		expect(toHumanReadable(stylelintResult.invalid)).toStrictEqual([]);
	});

	it('Has no unused rules', async () => {
		expect(toHumanReadable(stylelintResult.unused)).toStrictEqual([]);
	});
});
