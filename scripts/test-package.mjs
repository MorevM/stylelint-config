import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const directory = mkdtempSync(join(tmpdir(), 'stylelint-config-consumer-'));
const tarball = join(directory, 'stylelint-config.tgz');

const run = (command, args, cwd = root) => execFileSync(command, args, {
	cwd,
	stdio: 'inherit',
	env: { ...process.env, NODE_PATH: '' },
});

try {
	run('pnpm', ['build']);
	run('pnpm', ['pack', '--ignore-scripts', '--out', tarball]);
	cpSync(new URL('../fixtures/consumer/', import.meta.url), directory, {
		recursive: true,
		filter: (source) => !['node_modules', 'pnpm-lock.yaml', 'stylelint-config.tgz'].includes(basename(source)),
	});
	run('pnpm', ['install', '--ignore-scripts', '--store-dir', join(directory, 'store')], directory);
	run('pnpm', ['test'], directory);

	process.stdout.write('Installed-package runtime and TypeScript checks passed.\n');
} finally {
	rmSync(directory, { recursive: true, force: true });
}
