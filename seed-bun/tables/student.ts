import type { Knex } from 'knex';

import { knex } from '../db/knex';
import { createHashedPassword } from '../db/utils/password';
import { createRandomUser, type User } from '../fakes/user';

export type Ethnicity = 'chinese' | 'indian' | 'malay' | 'other';
export type Role = 'admin' | 'user';

export interface StudentRecord {
  student_id?: number; // Auto-generated
  name: string;
  date_of_birth: Date;
  contact_info: string;
  email: string;
  password: string; // In bcrypt form
  gender: 'm' | 'f';
  ethnicity: Ethnicity;
  role: Role;
}

export const toStudentRecord = (user: User, password: string): StudentRecord => ({
  contact_info: user.phoneNumber,
  date_of_birth: user.birthday,
  email: user.email,
  ethnicity: user.ethnicity,
  gender: user.sex[0] as 'm' | 'f',
  name: user.fullName,
  password,
  role: user.role
});

export const DEFAULT_STUDENTS_SIZE = 100;

export const generateStudentsInsert = async ({
  knexInstance = knex,
  recordCount = DEFAULT_STUDENTS_SIZE
}: {
  knexInstance?: Knex;
  recordCount?: number;
} = {}) => {
  const data: User[] = Array.from({ length: recordCount }, () => createRandomUser());

  const passwordHashed = await createHashedPassword();

  return knexInstance<StudentRecord>('Student').insert(data.map((d) => toStudentRecord(d, passwordHashed))).toString();
}
