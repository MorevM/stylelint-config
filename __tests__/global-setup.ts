import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export default function setup() {
	// Build before workers start so rebuilding cannot remove another worker's artifacts.
	execFileSync('pnpm', ['build'], {
		cwd: fileURLToPath(new URL('../', import.meta.url)),
		stdio: 'inherit',
	});
}
