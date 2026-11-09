/**
 * Request context for product-screen tests: the same shape server.mjs passes to
 * renderScreen, built from a fresh in-memory database and the chosen identity adapter.
 */
import { openDb } from '../../src/db.mjs';
import { createIdentity } from '../../src/identity/index.mjs';
import { resolveSessionActor } from '../../src/identity/actor.mjs';
import { seedDevPersonas } from '../../src/identity/dev-seed.mjs';
import { creationStatus } from '../../src/creation.mjs';
import { obligationInventory } from '../../src/obligations.mjs';

export async function devContext(persona, { env = { ORB_DEV: '1' }, db = openDb() } = {}) {
  const identity = createIdentity(env);
  if (identity.id === 'dev') seedDevPersonas(db);
  let token = null; let session = null;
  if (persona) { ({ token } = await identity.signIn({ persona })); session = identity.session(token); }
  const actor = session ? resolveSessionActor(db, session, { dev: true }) : null;
  const sessions = session ? await identity.listSessions(token) : null;
  return {
    db, identity, token, session, actor, sessions, dev: true, query: new URLSearchParams(),
    creations: creationStatus(env), obligations: (g) => obligationInventory(db, g),
  };
}

/** The product part of a page: everything before the collapsed spec preview. */
export const product = (html) => html.split('<details class="spec')[0];
