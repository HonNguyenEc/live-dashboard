/** Hardcoded credentials (no real DB). All passwords are "123456". */

export type User = {
  email: string;
  password: string;
};

export const USERS: readonly User[] = [
  { email: 'admin@ecentric.vn', password: '123456' },
  { email: 'subaccount@ecentric.vn', password: '123456' },
  { email: 'usertest@ecentric.vn', password: '123456' },
];

/** Name of the httpOnly auth cookie. */
export const COOKIE_NAME = 'rtd_session';
