/**
 * Record data plane for the UI.
 *
 * Screens are bound to tables through their compiled commands, so the tables a screen
 * may show are derived, never chosen by the browser. Each row is offered only the
 * commands whose `from_state` equals its current status: the state machine drives the
 * interface, and an impossible action is never rendered.
 *
 * Creation: the specification creates records "through authorised source command with
 * its creation invariants", but transitions.json contains no creation commands. A
 * generic create would therefore bypass the contract. It exists only as a dev fixture
 * path, disabled unless ORB_DEV=1, always lands in the machine's initial state, and is
 * labelled as such in every response.
 */
import { randomUUID } from 'node:crypto';
import { columns, insertRow, quoteIdent } from './db.mjs';
import { TRANSITIONS } from '../generated/transitions.mjs';
import { ENUMS } from '../generated/enums.mjs';
import { SCREEN_COMMANDS } from '../generated/screen-commands.mjs';

const MANAGED = new Set(['id', 'version', 'status', 'created_at', 'updated_at']);
const machineByTable = new Map(ENUMS.filter((m) => m.table).map((m) => [m.table, m]));

export class RecordError extends Error {
  constructor(code, message, details = {}) { super(message); this.code = code; this.details = details; }
}

/** Tables a screen may display: exactly those its bound commands act on. */
export function screenTables(screenId) {
  const binding = SCREEN_COMMANDS.find((s) => s.screen_id === screenId);
  return [...new Set((binding?.commands ?? []).map((c) => c.entity_table).filter(Boolean))].sort();
}

const knownTables = new Set(TRANSITIONS.map((t) => t.entity_table).filter(Boolean));

export function nextActions(table, status) {
  return TRANSITIONS
    .filter((t) => t.entity_table === table && t.from_state === status)
    .map((t) => ({
      command: t.command, transition_id: t.transition_id, to_state: t.to_state,
      requires: t.requires, reason_field: t.reason_field ?? null, source: t.source ?? 'spec',
    }));
}

export function listRecords(db, table, { workspaceId, limit = 50 } = {}) {
  if (!knownTables.has(table)) throw new RecordError('UNKNOWN_TABLE', `${table} is not a command-bound table`);
  if (!workspaceId) throw new RecordError('WORKSPACE_REQUIRED', 'records are only listed inside a workspace');
  const cap = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const rows = db.prepare(
    `SELECT * FROM ${quoteIdent(table)} WHERE workspace_id = ? ORDER BY updated_at DESC, id LIMIT ?`,
  ).all(workspaceId, cap);
  const machine = machineByTable.get(table) ?? null;
  return {
    table,
    machine_id: machine?.machine_id ?? null,
    states: machine?.states ?? [],
    count: rows.length,
    records: rows.map((r) => ({ ...r, next_actions: nextActions(table, r.status) })),
  };
}

export function createFixture(db, table, fields = {}, { workspaceId, gymId = null, dev = false } = {}) {
  if (!dev) {
    throw new RecordError('CREATION_COMMAND_ABSENT',
      'the specification creates records through source commands, and none exist in transitions.json; fixture creation requires ORB_DEV=1');
  }
  if (!knownTables.has(table)) throw new RecordError('UNKNOWN_TABLE', `${table} is not a command-bound table`);
  if (!workspaceId) throw new RecordError('WORKSPACE_REQUIRED', 'a fixture must belong to a workspace');

  const cols = new Set(columns(db, table).map((c) => c.name));
  const unknown = Object.keys(fields).filter((k) => !cols.has(k));
  if (unknown.length) throw new RecordError('UNKNOWN_FIELDS', `not columns of ${table}: ${unknown.join(', ')}`, { unknown });
  const managed = Object.keys(fields).filter((k) => MANAGED.has(k) || k === 'workspace_id');
  if (managed.length) throw new RecordError('MANAGED_FIELDS', `managed by the engine: ${managed.join(', ')}`, { managed });

  const now = new Date().toISOString();
  const row = { id: randomUUID(), version: 1, created_at: now, updated_at: now, workspace_id: workspaceId, ...fields };
  if (cols.has('gym_id') && gymId && row.gym_id == null) row.gym_id = gymId;
  insertRow(db, table, row); // status omitted: the schema default is the machine's initial state
  const stored = db.prepare(`SELECT * FROM ${quoteIdent(table)} WHERE id = ?`).get(row.id);
  return { ok: true, provenance: 'dev-fixture', record: { ...stored, next_actions: nextActions(table, stored.status) } };
}
