const { resolve } = require('path');
const fs = require('fs');
const util = require('util');
const { ESLint } = require('eslint');

const eslint = new ESLint({ fix: true });

const pkg = require('../package.json');

const { makeConfig } = require('./tools.js');

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

const getNames = ({ name }, mode) => {
	const filename = (mode === 'default') ? `${name}.js` : `${name}-${mode}.js`;
	const exportsName = (mode === 'default') ? `./${name}` : `./${name}/${mode}`;

	return { filename, exportsName };
};

(async () => {
	await configurations.forEach(async (config) => {
		await ['default', 'strict', 'quiet'].forEach(async (mode) => {
			const extend = config.extend
				? `./${getNames({ name: config.extend }, mode).filename}`
				: null;
			let configSource = makeConfig([{ ...config, extend, mode }]);
			configSource = toExports(configSource);

			const { filename, exportsName } = getNames(config, mode);
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
