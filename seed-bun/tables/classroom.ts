import type { BunFile } from 'bun';
import { knex } from '../db/knex';
import type { Knex } from 'knex';

export interface ClassroomRecord {
  max_size: number;
  floor_level: number;
  floor_type: 'basement' | 'above_ground';
  room_number: string;
  building_name: string;
}

export const generateClassroomsInsert = async ({
  knexInstance = knex,
  classroomsFile
}: {
  knexInstance?: Knex,
  classroomsFile: BunFile
}) => {
  const data = await classroomsFile.json() as ClassroomRecord[];

  return knexInstance<ClassroomRecord>('Classroom').insert(data).toString();
}
