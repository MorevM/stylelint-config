const cp = require('child_process');
const stylelintRules = require('stylelint-find-new-rules');

const toHumanReadable = (declarations) => declarations.map((declaration) =>
	[declaration.name, declaration.url].filter(Boolean).join(' / '));

describe('Check unused and deprecated props', () => {
	let stylelintResult = null;

	beforeAll(async () => {
		cp.execSync('yarn build'); // Actual, newest stylelint config of this repo extends bundled version
		stylelintResult = await stylelintRules();
	});

	it('Has no deprecated rules', async () => {
		expect(toHumanReadable(stylelintResult.deprecated)).toHaveLength(0);
	});

	it('Has no invalid rules', async () => {
		expect(toHumanReadable(stylelintResult.invalid)).toHaveLength(0);
	});

	it('Has no unused rules', async () => {
		expect(toHumanReadable(stylelintResult.unused)).toHaveLength(0);
	});
});
