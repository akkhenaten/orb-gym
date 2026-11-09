/**
 * Identity adapter (HANDOVER decision 2: provider-neutral).
 *
 * WF-AUTH-01 requires provider-held credentials and factors: "No homemade factor
 * storage". So Orb Gym never stores a password or factor. Every sign-in, sign-up,
 * verification, factor, session and recovery call goes through an adapter with this
 * interface:
 *
 *   capabilities()                       what the configured provider supports
 *   session(token)                       -> {token_id, subject, verified, contact, claims} | null
 *   signIn(input) / signUp(input)        -> {token, session}
 *   verifyContact(token, input)
 *   challenge(token, input) / enrolFactor(token, input)
 *   listSessions(token) / revokeSession(token, tokenId) / signOut(token)
 *   beginRecovery(input)                 generic response; never reveals whether an account exists
 *
 * Two adapters exist:
 *   unconfigured (default)  refuses everything with IDENTITY_PROVIDER_UNCONFIGURED
 *   dev                     ORB_DEV=1 only; synthetic personas, no passwords, no factors,
 *                           and it refuses to load when NODE_ENV=production
 *
 * A real provider adapter replaces `dev` once one is chosen; the screens and actor
 * resolution do not change.
 */
import { randomUUID, randomBytes } from 'node:crypto';

export const IDENTITY_PROVIDER_UNCONFIGURED = 'IDENTITY_PROVIDER_UNCONFIGURED';

export class IdentityError extends Error {
  constructor(code, message, status = 400) { super(message); this.code = code; this.status = status; }
}

const unconfigured = () => {
  const refuse = async () => {
    throw new IdentityError(IDENTITY_PROVIDER_UNCONFIGURED,
      'no identity provider is configured; sign-in, factors and recovery stay unavailable until one is chosen and verified', 503);
  };
  return {
    id: 'unconfigured',
    capabilities: () => ({
      provider: 'unconfigured', configured: false, synthetic: false,
      sign_in: false, sign_up: false, verify_contact: false, mfa: false, sessions: false, recovery: false,
    }),
    session: () => null,
    personas: () => [],
    signIn: refuse, signUp: refuse, verifyContact: refuse, challenge: refuse, enrolFactor: refuse,
    listSessions: refuse, revokeSession: refuse, signOut: refuse, beginRecovery: refuse,
  };
};

/** Fixed synthetic personas. Contacts use the reserved .invalid domain: nothing can be delivered. */
export const DEV_PERSONAS = Object.freeze([
  { persona: 'owner', subject: 'dev:owner', label: 'Company owner', display_name: 'Dev Owner (synthetic)', contact: 'owner@example.invalid', claims: {} },
  { persona: 'gym-manager', subject: 'dev:manager', label: 'Local gym manager', display_name: 'Dev Gym Manager (synthetic)', contact: 'manager@example.invalid', claims: {} },
  { persona: 'platform-admin', subject: 'dev:platform', label: 'Platform admin', display_name: 'Dev Platform Admin (synthetic)', contact: 'platform@example.invalid', claims: { platform_roles: ['platform-admin'] } },
]);

function dev(env) {
  if (env.NODE_ENV === 'production') {
    throw new IdentityError('DEV_IDENTITY_REFUSED', 'the dev identity adapter cannot load under NODE_ENV=production', 500);
  }
  const sessions = new Map(); // token -> session
  const subjects = new Map(DEV_PERSONAS.map((p) => [p.subject, { subject: p.subject, verified: true, contact: p.contact, claims: p.claims }]));

  const open = (subject, userAgent) => {
    const token = randomBytes(24).toString('base64url');
    const s = { token_id: randomUUID(), subject, created_at: new Date().toISOString(), user_agent: String(userAgent ?? '').slice(0, 120), assurance: 'synthetic-no-factor' };
    sessions.set(token, s);
    return { token, session: s };
  };
  const need = (token) => {
    const s = sessions.get(token);
    if (!s) throw new IdentityError('SESSION_REQUIRED', 'sign in first', 401);
    return s;
  };
  const view = (s) => (s ? { ...s, ...subjects.get(s.subject) } : null);
  const noFactor = async () => {
    throw new IdentityError('FACTOR_UNSUPPORTED', 'the dev adapter has no factors; MFA needs the chosen identity provider', 501);
  };

  return {
    id: 'dev',
    capabilities: () => ({
      provider: 'dev', configured: true, synthetic: true,
      sign_in: true, sign_up: true, verify_contact: true, mfa: false, sessions: true, recovery: false,
    }),
    session: (token) => (token ? view(sessions.get(token)) : null),
    personas: () => DEV_PERSONAS.map(({ persona, label, display_name }) => ({ persona, label, display_name })),
    async signIn({ persona } = {}, ctx = {}) {
      const p = DEV_PERSONAS.find((x) => x.persona === persona);
      // one generic message for any failure, so sign-in never confirms which accounts exist
      if (!p) throw new IdentityError('SIGN_IN_FAILED', 'sign-in did not succeed', 401);
      return open(p.subject, ctx.userAgent);
    },
    async signUp({ contact } = {}, ctx = {}) {
      const c = String(contact ?? '').trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.invalid$/.test(c)) {
        throw new IdentityError('SYNTHETIC_CONTACT_REQUIRED', 'the dev adapter accepts only reserved addresses ending in .invalid', 400);
      }
      const subject = `dev:new:${randomUUID()}`;
      subjects.set(subject, { subject, verified: false, contact: c, claims: {} });
      return open(subject, ctx.userAgent);
    },
    async verifyContact(token) {
      const s = need(token);
      subjects.get(s.subject).verified = true; // synthetic: nothing is sent, the step is confirmed in-page
      return { verified: true, synthetic: true };
    },
    challenge: noFactor,
    enrolFactor: noFactor,
    async listSessions(token) {
      const s = need(token);
      return [...sessions.entries()].filter(([, x]) => x.subject === s.subject)
        .map(([t, x]) => ({ token_id: x.token_id, created_at: x.created_at, user_agent: x.user_agent, assurance: x.assurance, current: t === token }));
    },
    async revokeSession(token, tokenId) {
      const s = need(token);
      for (const [t, x] of sessions) if (x.subject === s.subject && x.token_id === tokenId) { sessions.delete(t); return { revoked: true }; }
      throw new IdentityError('SESSION_NOT_FOUND', 'no such session for this account', 404);
    },
    async signOut(token) { sessions.delete(token); return { signed_out: true }; },
    async beginRecovery() {
      return { accepted: true, synthetic: true, message: 'If an account matches, the identity provider sends recovery instructions. The dev adapter sends nothing.' };
    },
  };
}

export function createIdentity(env = process.env) {
  if (env.ORB_DEV === '1' && (env.ORB_IDENTITY ?? 'dev') === 'dev') return dev(env);
  return unconfigured();
}
