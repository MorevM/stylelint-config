import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const directory = join(root, 'fixtures/consumer');
const run = (args, cwd = root) => execFileSync('pnpm', args, { cwd, stdio: 'inherit' });

run(['build']);
run(['pack', '--ignore-scripts', '--out', join(directory, 'stylelint-config.tgz')]);

// Recreate generated install state so pnpm reads the new tarball at the same path.
rmSync(join(directory, 'pnpm-lock.yaml'), { force: true });
rmSync(join(directory, 'node_modules'), { recursive: true, force: true });
run(['install', '--ignore-scripts', '--store-dir', join(root, 'node_modules/.pnpm-store')], directory);
