import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const agentDir = path.join(rootDir, '.caveman', 'agent');
const cliPath = path.join(rootDir, 'node_modules', '@juliusbrussee', 'caveman-code', 'dist', 'cli.js');

mkdirSync(agentDir, { recursive: true });

const env = {
  ...process.env,
  'CAVEMAN-CODE_CODING_AGENT_DIR': agentDir,
};

const child = spawn(process.execPath, [cliPath, ...process.argv.slice(2)], {
  cwd: rootDir,
  env,
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
