/**
 * Product screen registry: screen_id -> renderer(ctx, query). A screen without an entry
 * keeps the spec preview in ui.mjs, so the remaining screens are unchanged until their
 * cards are built. Renderers return body HTML only; ui.mjs wraps it in the shell with
 * the spec details collapsed underneath for traceability.
 */
import * as auth from './auth.mjs';
import * as space from './space.mjs';

export const PRODUCT_SCREENS = Object.freeze({
  'SCR-006': { card: '03', render: auth.signIn },
  'SCR-007': { card: '03', render: auth.signUp },
  'SCR-008': { card: '03', render: auth.emailVerification },
  'SCR-009': { card: '04', render: auth.passwordRecovery },
  'SCR-010': { card: '02', render: auth.mfa },
  'SCR-011': { card: '04', render: auth.lostFactor },
  'SCR-012': { card: '05', render: auth.sessionsAndSecurity },
  'SCR-013': { card: '24', render: space.onboarding },
  'SCR-014': { card: '25', render: space.portfolio },
  'SCR-015': { card: '25', render: space.gymDirectory },
  'SCR-016': { card: '25', render: space.gymSettings },
  'SCR-017': { card: '26', render: space.platformSupport },
});

export { SCREEN_CSS, FORM_SCRIPT } from './components.mjs';
