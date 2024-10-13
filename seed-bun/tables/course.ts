import { Knex } from 'knex';
import { knex } from '../db/knex';

export interface CourseRaw {
  year?: number | string;
  school?: string;
  course_name: string;
  course_code?: string;
  course_description: string;
  reference?: string;
  credits: number;
}

import courses from '../fakes/data/courses.json' with { type: 'json' };

export interface CourseRecord {
  course_name: string;
  description: string;
  credits: number;
}

export const toCourseRecord = (raw: CourseRaw): CourseRecord => ({
  course_name: raw.course_name,
  description: raw.course_description,
  credits: raw.credits
});

export const DEFAULT_COURSES_SIZE = courses.length;

export const generateCourseInsert = async ({
  knexInstance = knex,
  coursesData = courses
}: {
  knexInstance?: Knex,
  coursesData?: CourseRaw[]
} = {}) => {
  return knexInstance<CourseRecord>('Course').insert(coursesData.map(toCourseRecord)).toString();
}
