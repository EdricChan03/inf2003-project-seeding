import type { Knex } from 'knex';

import { knex } from '../db/knex';
import { createRandomEnrolment, type Enrolment } from '../fakes/enrolment';

export type EnrolmentStatus = 'enrolled' | 'pending' | 'cancelled' | 'delayed' | 'other';

export interface EnrolmentRecord {
  enrolment_id?: number; // Auto-generated
  student_id: number; // Foreign-key
  course_id: number; // Foreign key
  enrolment_date: Date;
  status: EnrolmentStatus;
}

export const toEnrolmentRecord = (e: Enrolment): EnrolmentRecord => ({
  student_id: e.studentId,
  course_id: e.courseId,
  enrolment_date: e.enrolmentDate,
  status: e.status
});

export const generateEnrolmentsInsert = async ({
  knexInstance = knex,
  recordCount = 100,
  coursesSize,
  studentsSize
}: {
  knexInstance?: Knex;
  recordCount?: number;
  coursesSize: number;
  studentsSize: number;
}) => {
  const data: Enrolment[] = Array.from({ length: recordCount }, () => createRandomEnrolment({ coursesSize, studentsSize }));

  return knexInstance<EnrolmentRecord>('Enrolment').insert(data.map(toEnrolmentRecord)).toString();
}
