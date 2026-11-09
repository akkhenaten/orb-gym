/**
 * WF-SPACE-05 checkpoint 1: "Inventory future services, people, assets/stock, public
 * links and financial obligations" before a gym is archived.
 *
 * Read-only and derived: every table with a gym_id column, counting rows whose state is
 * not terminal. A state is terminal when its machine has no transition out of it, so no
 * list of "open" states is chosen here. The inventory informs the reviewer; it does not
 * add a guard to StartGymArchive/CompleteGymArchive, because the spec defines none.
 */
import { tables, columns, quoteIdent } from './db.mjs';
import { ENUMS } from '../generated/enums.mjs';
import { TRANSITIONS } from '../generated/transitions.mjs';

const machineByTable = new Map(ENUMS.filter((m) => m.table).map((m) => [m.table, m]));

export function terminalStates(table) {
  const m = machineByTable.get(table);
  if (!m) return [];
  const leaving = new Set(TRANSITIONS.filter((t) => t.entity_table === table).map((t) => t.from_state));
  return m.states.filter((s) => !leaving.has(s));
}

export function obligationInventory(db, gymId) {
  const out = [];
  for (const table of tables(db)) {
    if (table === 'gym' || table.startsWith('_')) continue;
    const cols = columns(db, table).map((c) => c.name);
    if (!cols.includes('gym_id') || !cols.includes('status')) continue;
    const terminal = terminalStates(table);
    const marks = terminal.map(() => '?').join(',');
    const rows = db.prepare(
      `SELECT status, COUNT(*) AS n FROM ${quoteIdent(table)} WHERE gym_id = ?${terminal.length ? ` AND status NOT IN (${marks})` : ''} GROUP BY status ORDER BY status`,
    ).all(gymId, ...terminal);
    const open = rows.reduce((a, r) => a + Number(r.n), 0);
    if (open) out.push({ table, open, by_state: Object.fromEntries(rows.map((r) => [r.status, Number(r.n)])), terminal_states: terminal });
  }
  return { gym_id: gymId, tables: out, open_total: out.reduce((a, t) => a + t.open, 0) };
}
