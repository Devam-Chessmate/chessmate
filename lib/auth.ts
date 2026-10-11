export const AUTH_COOKIE_NAME = "chessmate_admin_session";

const DEFAULT_ADMIN_PASSWORD = "chessmate@devam$#";

/**
 * Returns the configured admin password from environment variables
 * or falls back to the default admin password.
 */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

/**
 * Generates a SHA-256 session token from the admin password.
 * Works seamlessly in both Node.js and Next.js Edge Middleware environments.
 */
export async function getAdminToken(): Promise<string> {
  const secret = getAdminPassword();
  const encoder = new TextEncoder();
  const data = encoder.encode(`chessmate_admin_auth_salt_v1:${secret}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Validates whether the given cookie token matches the expected admin token.
 */
export async function isValidAdminToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const expectedToken = await getAdminToken();
  return token === expectedToken;
}

/**
 * Verifies if the entered password matches the admin password.
 */
export function verifyAdminPassword(password?: string | null): boolean {
  if (!password) return false;
  return password === getAdminPassword();
}
