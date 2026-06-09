/**
 * Signed session token using HMAC-SHA256 via Web Crypto (`crypto.subtle`).
 *
 * Web Crypto is used (not Node's `crypto` module) so the same code runs in
 * both Node API routes and the Edge middleware runtime. Functions are async.
 *
 * Token format: `<base64url(payloadJson)>.<base64url(hmac)>`
 */

const SECRET = process.env.AUTH_SECRET ?? 'dev-secret-change-me';
const encoder = new TextEncoder();

type TokenPayload = {
  email: string;
  iat: number; // issued-at (ms)
};

/** base64url-encode raw bytes (no padding) — works in Node and Edge. */
function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function encodeText(text: string): string {
  return toBase64Url(encoder.encode(text));
}

function decodeText(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return toBase64Url(new Uint8Array(signature));
}

/** Sign a token for the given user email. */
export async function signToken(email: string): Promise<string> {
  const payload: TokenPayload = { email, iat: Date.now() };
  const body = encodeText(JSON.stringify(payload));
  const sig = await hmac(body);
  return `${body}.${sig}`;
}

/**
 * Verify a token's signature. Returns the email on success, or null if the
 * token is missing, malformed, or the signature does not match.
 */
export async function verifyToken(token: string | undefined | null): Promise<string | null> {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;

  const expected = await hmac(body);
  // Length check first; constant-time-ish compare below is sufficient here.
  if (expected.length !== sig.length || expected !== sig) return null;

  try {
    const payload = JSON.parse(decodeText(body)) as TokenPayload;
    return payload.email ?? null;
  } catch {
    return null;
  }
}
