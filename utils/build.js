import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import util from 'node:util';
import { css, scss } from '../configurations/index.js';

const CONFIGURATIONS = [
	{ name: 'css', configuration: css },
	{ name: 'scss', extend: 'css', configuration: scss },
];

const BUILD_DIRECTORY_RELATIVE = './build/configurations/';
const BUILD_DIRECTORY = resolve(import.meta.dirname, '..', BUILD_DIRECTORY_RELATIVE);

rmSync(BUILD_DIRECTORY, { recursive: true, force: true });
mkdirSync(BUILD_DIRECTORY, { recursive: true });

const toExport = (source) =>
	`export default ${util.inspect(source, { maxArrayLength: 9999, depth: 999 })}`
		.replaceAll(/["'](import\(.*\))["']/g, '(await $1).default'); // unwrap imports

CONFIGURATIONS.forEach((declaration) => {
	const configuration = {
		extends: declaration.extend ? [`./${declaration.extend}.js`] : [],
		...declaration.configuration,
	};

	const filename = `${declaration.name}.js`;
	const configSource = toExport(configuration);

	writeFileSync(`${BUILD_DIRECTORY}/${filename}`, configSource);
});
