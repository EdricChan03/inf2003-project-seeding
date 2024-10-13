import type { Knex } from 'knex';
import { knex } from '../db/knex';
import { createHashedPassword } from '../db/utils/password';
import { createRandomUser, type User } from '../fakes/user';
import { Role } from './student';

export interface StaffRecord {
  name: string;
  gender: 'm' | 'f';
  contact_info: string;
  email: string;
  password: string;
  role: Role;
}

export const toStaffRecord = (user: User, password: string): StaffRecord => ({
  name: user.fullName,
  gender: user.sex[0] as 'm' | 'f',
  contact_info: user.phoneNumber,
  email: user.email,
  password,
  role: user.role // TODO
});

export const generateStaffInsert = async ({
  knexInstance = knex,
  recordCount = 50
}: {
  knexInstance?: Knex;
  recordCount?: number;
} = {}) => {
  const data: User[] = Array.from({ length: recordCount }, () => createRandomUser());

  const passwordHashed = await createHashedPassword();

  return knexInstance<StaffRecord>('Staff').insert(data.map((d) => toStaffRecord(d, passwordHashed)), ['student_id']).toString();
}
