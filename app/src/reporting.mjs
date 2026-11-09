/**
 * Reporting engine.
 *
 * Every metric here executes as SQL over the generated tables. A metric that cannot
 * be computed returns an explicit status and reason; it never returns zero, because a
 * zero in a finance view is a claim, not an absence.
 *
 * Money is integer minor units throughout (the currency rule established for this
 * build), so no floating point ever touches an amount.
 */
import { UNIMPLEMENTED_METRICS } from '../generated/reporting.mjs';

const REASONS = new Map(UNIMPLEMENTED_METRICS.map((u) => [u.key, u.reason]));

/** Does a column exist? Reporting must not assume state that the schema never declared. */
const hasColumn = (db, table, column) => db
  .prepare(`SELECT count(*) c FROM pragma_table_info(?) WHERE name = ?`)
  .get(table, column).c > 0;

const unavailable = (key, reason) => ({ status: 'UNAVAILABLE', value_minor: null, reason, key });

const sum = (db, sql, params = []) => {
  const row = db.prepare(sql).get(...params);
  return Number(Object.values(row ?? {})[0] ?? 0);
};

const scopeWhere = (scope, column = 'gym_id') => {
  const parts = [];
  const params = [];
  if (scope?.workspaceId) { parts.push('workspace_id = ?'); params.push(scope.workspaceId); }
  if (scope?.gymId) { parts.push(`${column} = ?`); params.push(scope.gymId); }
  return { clause: parts.length ? ` AND ${parts.join(' AND ')}` : '', params };
};

/**
 * Metric implementations. `basis` is repeated in the result so a consumer can show
 * where a number came from without consulting this file.
 */
const IMPL = {
  posted_charges: (db, scope) => {
    // The charge state machine declares VOID, but customer_charge carries no state
    // column, so posted versus void is undecidable here. Returning a number would be a
    // guess about which charges still stand.
    if (!hasColumn(db, 'customer_charge', 'status')) {
      return unavailable('posted_charges',
        'customer_charge has no state column, so VOID charges cannot be excluded; MET-FIN-01 requires "posted non-void" charges');
    }
    const { clause, params } = scopeWhere(scope);
    return {
      value_minor: sum(db, `SELECT COALESCE(SUM(amount_minor), 0) FROM customer_charge WHERE status <> 'VOID'${clause}`, params),
      basis: 'SUM(customer_charge.amount_minor) where status <> VOID; VOID is unreachable until a source transition exists',
    };
  },
  posted_credits: (db, scope) => {
    // MET-FIN-02: "valid credit-note amounts issued in period; exclude void/draft credits".
    if (!hasColumn(db, 'credit_note', 'status')) {
      return unavailable('posted_credits',
        'credit_note has no state column, so void and draft credits cannot be excluded as MET-FIN-02 requires');
    }
    const { clause, params } = scopeWhere(scope);
    return {
      value_minor: sum(db, `SELECT COALESCE(SUM(amount_minor), 0) FROM credit_note WHERE status = 'ISSUED'${clause}`, params),
      basis: 'SUM(credit_note.amount_minor) where status = ISSUED; DRAFT and VOID excluded and currently unreachable',
    };
  },
  net_charge_activity: (db, scope) => {
    const charges = IMPL.posted_charges(db, scope);
    if (charges.status === 'UNAVAILABLE') {
      return unavailable('net_charge_activity', `blocked by posted_charges: ${charges.reason}`);
    }
    const credits = IMPL.posted_credits(db, scope);
    if (credits.status === 'UNAVAILABLE') {
      return unavailable('net_charge_activity', `blocked by posted_credits: ${credits.reason}`);
    }
    return { value_minor: charges.value_minor - credits.value_minor, basis: 'posted charges less posted credits' };
  },
  confirmed_collections: (db, scope) => {
    const { clause, params } = scopeWhere(scope);
    // Deduplicate by provider_reference: a provider may deliver the same callback more
    // than once, and counting each delivery would inflate collections.
    const sql = `SELECT COALESCE(SUM(a.signed_amount_minor), 0) FROM payment_allocation a
      WHERE a.movement_id IN (
        SELECT provider_reference FROM payment_attempt
        WHERE attempt_state = 'CONFIRMED' AND provider_reference IS NOT NULL
        GROUP BY provider_reference
      )${clause.replace(/gym_id/g, 'a.gym_id').replace(/workspace_id/g, 'a.workspace_id')}`;
    return {
      value_minor: sum(db, sql, params),
      basis: 'SUM(payment_allocation.signed_amount_minor) for confirmed attempts, deduplicated by provider_reference',
    };
  },
  refunds: (db, scope) => {
    const { clause, params } = scopeWhere(scope);
    return {
      value_minor: sum(db, `SELECT COALESCE(SUM(amount_minor), 0) FROM refund_request WHERE state = 'CONFIRMED'${clause}`, params),
      basis: 'SUM(refund_request.amount_minor) for confirmed refunds',
    };
  },
};

export const implementedKeys = () => Object.keys(IMPL);

export function metricValue(db, key, scope = {}) {
  const impl = IMPL[key];
  if (!impl) {
    return {
      key,
      status: 'UNAVAILABLE',
      value_minor: null,
      reason: REASONS.get(key) ?? 'metric has no implementation and no recorded reason',
    };
  }
  const out = impl(db, scope);
  if (out.status === 'UNAVAILABLE') return out;
  return { key, status: 'OK', value_minor: out.value_minor, value: formatMinor(out.value_minor), basis: out.basis };
}

/** Format minor units as a decimal string, matching the pack's fixture notation. */
export const formatMinor = (minor) => (minor === null ? null
  : `${minor < 0 ? '-' : ''}${Math.floor(Math.abs(minor) / 100)}.${String(Math.abs(minor) % 100).padStart(2, '0')}`);

export function runMetrics(db, keys, scope = {}) {
  const results = keys.map((k) => metricValue(db, k, scope));
  return {
    metrics: results.map((r) => ({ ...r, value: r.status === 'OK' ? formatMinor(r.value_minor) : null })),
    ok: results.filter((r) => r.status === 'OK').length,
    unavailable: results.filter((r) => r.status !== 'OK').length,
  };
}
