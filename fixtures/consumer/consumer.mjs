import assert from 'node:assert/strict';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import defaultConfig, {	PROPERTIES_ORDER,	RULES_ORDER } from '@morev/stylelint-config';
import css from '@morev/stylelint-config/css';
import scss from '@morev/stylelint-config/scss';
import stylelint from 'stylelint';

for (const entry of ['@morev/stylelint-config', '@morev/stylelint-config/css', '@morev/stylelint-config/scss']) {
	assert.ok(fileURLToPath(import.meta.resolve(entry)).startsWith(join(process.cwd(), 'node_modules')));
}

assert.deepEqual(defaultConfig, scss);
assert.ok(css.rules['color-no-invalid-hex']);
assert.ok(Array.isArray(PROPERTIES_ORDER));
assert.ok(Array.isArray(RULES_ORDER));

const lint = async (codeFilename, code) => {
	const { results: [result] } = await stylelint.lint({
		code,
		codeFilename,
		configFile: join(process.cwd(), 'stylelint.config.ts'),
	});

	assert.deepEqual(result.parseErrors, []);
	assert.deepEqual(result.invalidOptionWarnings, []);
	return result.warnings.map(({ rule }) => rule);
};

const cssWarnings = await lint('src/styles/invalid.css', '.card { color: #ggg; }\n');
assert.ok(cssWarnings.includes('color-no-invalid-hex'));

// The consumer config changes long to short, so #ffffff must warn in favor of #fff.
const notationWarnings = await lint('src/styles/notation.css', '.card { color: #ffffff; }\n');
assert.ok(notationWarnings.includes('color-hex-length'));

const scssWarnings = await lint('src/styles/invalid.scss', [
	'// SCSS syntax',
	'$brand: #ggg;',
	'.card { color: $brand; }',
	'',
].join('\n'));
assert.ok(scssWarnings.includes('color-no-invalid-hex'));

const component = '.card { color: red; }\n';
const componentWarnings = await lint('src/components/card/card.scss', component);
assert.ok(componentWarnings.includes('@morev/bem/block-variable'));

const otherWarnings = await lint('src/styles/card.scss', component);
assert.ok(otherWarnings.every((rule) => !rule.startsWith('@morev/bem/')));
