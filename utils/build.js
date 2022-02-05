const { resolve } = require('path');
const fs = require('fs');
const util = require('util');
const { ESLint } = require('eslint');

const eslint = new ESLint({ fix: true });

const pkg = require('../package.json');

const { makeConfig } = require('./tools');

const CONFIGS_DIR_REL = './build/configurations/';
const CONFIGS_DIR = resolve(__dirname, '..', CONFIGS_DIR_REL);

fs.rmSync(CONFIGS_DIR, { recursive: true, force: true });
fs.mkdirSync(CONFIGS_DIR, { recursive: true });

const configurations = [
	{
		name: 'css',
	},
	{
		name: 'scss',
		extend: 'css',
	},
];

let exportsField = {};

const toExports = (source) =>
	`module.exports = ${util.inspect(source, { maxArrayLength: 9999, depth: 999 })}`
		.replace(/["'](require\(.*\))["']/g, '$1'); // unwrap require call

const getNames = ({ name }, autofixable) => {
	const filename = (autofixable === 'bypass')
		? `${name}.js`
		: `${name}-${autofixable}-autofixable.js`;

	const exportsName = (autofixable === 'bypass')
		? `./${name}`
		: `./${name}/${autofixable}-autofixable`;

	return { filename, exportsName };
};

(async () => {
	await configurations.forEach(async (config) => {
		await ['bypass', 'warn', 'off'].forEach(async (autofixable) => {
			const extend = config.extend
				? `./${getNames({ name: config.extend }, autofixable).filename}`
				: null;
			let configSource = makeConfig([{ ...config, extend, autofixable }]);
			configSource = toExports(configSource);

			const { filename, exportsName } = getNames(config, autofixable);
			exportsField[exportsName] = `${CONFIGS_DIR_REL}${filename}`;

			fs.writeFileSync(`${CONFIGS_DIR}/${filename}`, configSource);
		});
	});

	// Main export aliasing `/configurations/scss`
	exportsField = {
		'.': exportsField['./scss'],
		...exportsField,
	};

	pkg.exports = exportsField;
	pkg.main = exportsField['.'];

	fs.writeFileSync(`package.json`, JSON.stringify(pkg, null, '\t'));
	ESLint.outputFixes(await eslint.lintFiles('./package.json')); // lint updated
})();
