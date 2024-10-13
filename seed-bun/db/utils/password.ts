import { password } from 'bun';

// https://xkcd.com/936/
export const createHashedPassword = (passwordRaw: string = 'correct-horse-battery-staple') => password.hash(passwordRaw, {
  algorithm: 'bcrypt',
  cost: 4
});
