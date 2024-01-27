import cp from 'node:child_process';
import { describe, it, expect, beforeAll } from 'vitest';
import stylelintRules from 'stylelint-find-new-rules';

const toHumanReadable = (declarations) => declarations.map((declaration) =>
	[declaration.name, declaration.url].filter(Boolean).join(' / '));

describe('Check unused and deprecated props', () => {
	let stylelintResult = null;

	beforeAll(async () => {
		cp.execSync('yarn build'); // Actual, newest stylelint config of this repo extends bundled version
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
