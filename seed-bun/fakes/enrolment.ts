import { faker } from '@faker-js/faker';

import { startOfYear } from 'date-fns';
import type { EnrolmentStatus } from '../tables/enrolment';

export interface Enrolment {
  studentId: number;
  courseId: number;
  enrolmentDate: Date;
  status: EnrolmentStatus;
}

export const createRandomEnrolment = ({
  coursesSize,
  studentsSize
}: {
  coursesSize: number;
  studentsSize: number;
}): Enrolment => {
  const enrolledDate = faker.date.between({
    from: startOfYear(new Date()),
    to: new Date()
  });

  return {
    courseId: faker.number.int({
      min: 1,
      max: coursesSize
    }),
    studentId: faker.number.int({
      min: 1,
      max: studentsSize
    }),
    enrolmentDate: enrolledDate,
    status: faker.helpers.arrayElement(['enrolled', 'pending', 'cancelled', 'delayed', 'other'])
  }
};
