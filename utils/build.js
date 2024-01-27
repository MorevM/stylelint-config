import { dirname, resolve } from 'node:path';
import util from 'node:util';
import { fileURLToPath } from 'node:url';
import { readFileSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { ESLint } from 'eslint';
import { css, scss } from '../configurations/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CONFIGURATIONS = [
	{ name: 'css', configuration: css },
	{ name: 'scss', extend: 'css', configuration: scss },
];

const BUILD_DIRECTORY_RELATIVE = './build/configurations/';
const BUILD_DIRECTORY = resolve(__dirname, '..', BUILD_DIRECTORY_RELATIVE);
const PACKAGE_JSON_PATH = resolve(__dirname, '..', 'package.json');

const eslint = new ESLint({ fix: true });

rmSync(BUILD_DIRECTORY, { recursive: true, force: true });
mkdirSync(BUILD_DIRECTORY, { recursive: true });

let exportsField = {};

const toExport = (source) =>
	`export default ${util.inspect(source, { maxArrayLength: 9999, depth: 999 })}`
		.replaceAll(/["'](import\(.*\))["']/g, '(await $1).default'); // unwrap imports

const getNames = ({ name }) => {
	const filename = `${name}.js`;
	const exportsName = `./${name}`;

	return { filename, exportsName };
};

CONFIGURATIONS.forEach((declaration) => {
	const configuration = {
		extends: declaration.extend ? [`./${declaration.extend}.js`] : [],
		...declaration.configuration,
	};

	const { exportsName, filename } = getNames(declaration);
	const configSource = toExport(configuration);
	exportsField[exportsName] = `${BUILD_DIRECTORY_RELATIVE}${filename}`;

	writeFileSync(`${BUILD_DIRECTORY}/${filename}`, configSource);
});

// Main export aliasing `/configurations/scss`
exportsField = {
	'.': exportsField['./scss'],
	...exportsField,
};

const packageJsonContents = JSON.parse(readFileSync(PACKAGE_JSON_PATH));
packageJsonContents.main = exportsField['.'];
packageJsonContents.exports = exportsField;

writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJsonContents, null, '\t'));
ESLint.outputFixes(await eslint.lintFiles('./package.json'));
