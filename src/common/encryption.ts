import bcrypt = require('bcrypt');

export function generateSecureHash(source: string): string {
  const rounds = 10;
  return bcrypt.hashSync(source, rounds);
}

export function compareHash(source: string, hash: string): boolean {
  return bcrypt.compareSync(source, hash);
}
