/**
 * Single entry point for the whole compile pipeline. Order matters: derived overlays
 * first (the core compiler reads them), then the core schema/engine, then every
 * projection that reads the core output. Zero dependencies; each step is a child
 * process so one failure stops the chain with that step's own error.
 */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
export const ORDER = [
  'derive-relationships', // docs/derived/relationships-inferred.json
  'derive-state-overlay', // docs/derived/state-overlay.json (charge/credit states + void transitions)
  'compile',              // schema.sql, transitions, enums, permissions, compile-report
  'derive-creation-overlay', // docs/derived/creation-overlay.json + generated/creations.mjs (proposals only)
  'compile-role-grants',  // generated/role-grants.mjs (baseline matrix; settled vs proposed)
  'compile-ui',           // screens, screen-commands, theme, cards, board-report
  'compile-notify',
  'compile-commercial',
  'compile-reporting',
  'compile-documents',
  'compile-capabilities',
];

for (const step of ORDER) {
  const r = spawnSync(process.execPath, [join(HERE, `${step}.mjs`)], { encoding: 'utf8' });
  if (r.status !== 0) {
    process.stderr.write(`FAIL ${step}\n${r.stdout}${r.stderr}`);
    process.exit(r.status ?? 1);
  }
  const last = r.stdout.trim().split('\n').pop();
  console.log(`ok   ${step.padEnd(22)} ${last}`);
}
