/**
 * Database layer. No ORM, no dependencies: Node's built-in SQLite.
 *
 * The schema is generated from the specification by tools/compile-spec, so the
 * database cannot drift from the entity catalogue.
 */
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
export const GENERATED = resolve(HERE, '..', 'generated');
const SCHEMA = readFileSync(join(GENERATED, 'schema.sql'), 'utf8');

/** @param {string} [file] path, or ':memory:' for tests */
export function openDb(file = ':memory:') {
  if (file !== ':memory:') mkdirSync(dirname(resolve(file)), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec(SCHEMA);
  return db;
}

export function tables(db) {
  return db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all().map((r) => r.name);
}

export function columns(db, table) {
  return db.prepare(`PRAGMA table_info(${quoteIdent(table)})`).all();
}

/** Table identifiers come from the compiler, but never interpolate unquoted. */
export function quoteIdent(name) {
  if (!/^[a-z_][a-z0-9_]*$/.test(name)) throw new Error(`unsafe identifier: ${name}`);
  return `"${name}"`;
}

export function insertRow(db, table, row) {
  const keys = Object.keys(row);
  if (!keys.length) throw new Error('insertRow needs at least one column');
  const sql = `INSERT INTO ${quoteIdent(table)} (${keys.map(quoteIdent).join(',')}) VALUES (${keys.map(() => '?').join(',')})`;
  db.prepare(sql).run(...keys.map((k) => row[k]));
  return row.id;
}

export function getRow(db, table, id) {
  return db.prepare(`SELECT * FROM ${quoteIdent(table)} WHERE id = ?`).get(id) ?? null;
}

export function updateRow(db, table, id, patch) {
  const keys = Object.keys(patch);
  if (!keys.length) return;
  const sql = `UPDATE ${quoteIdent(table)} SET ${keys.map((k) => `${quoteIdent(k)} = ?`).join(',')} WHERE id = ?`;
  db.prepare(sql).run(...keys.map((k) => patch[k]), id);
}

/** node:sqlite has no transaction helper, so transactions are explicit. */
export function transaction(db, fn) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const out = fn();
    db.exec('COMMIT');
    return out;
  } catch (err) {
    try { db.exec('ROLLBACK'); } catch { /* already rolled back */ }
    throw err;
  }
}
