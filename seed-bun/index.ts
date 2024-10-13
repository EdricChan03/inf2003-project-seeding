import { file, write, type BunFile } from 'bun';

import { DEFAULT_STUDENTS_SIZE, generateStudentsInsert } from './tables/student';
import { generateClassroomsInsert } from './tables/classroom';
import { generateStaffInsert } from './tables/staff';
import { DEFAULT_COURSES_SIZE, generateCourseInsert } from './tables/course';
import { generateEnrolmentsInsert } from './tables/enrolment';

const generateSeedScripts = async (
  outputDir: string = `${import.meta.dir}/seed-out`,
  classroomsDataFile: BunFile = file('./fakes/data/classrooms.json')
) => {
  const studentsFile = file(`${outputDir}/seed-students.sql`);
  await write(studentsFile, await generateStudentsInsert());
  const staffFile = file(`${outputDir}/seed-staff.sql`);
  await write(staffFile, await generateStaffInsert());

  const classroomsFile = file(`${outputDir}/seed-classrooms.sql`);
  await write(classroomsFile, await generateClassroomsInsert({
    classroomsFile: classroomsDataFile
  }));

  const coursesFile = file(`${outputDir}/seed-courses.sql`);
  await write(coursesFile, await generateCourseInsert());

  const enrolmentsFile = file(`${outputDir}/seed-enrolments.sql`);
  await write(enrolmentsFile, await generateEnrolmentsInsert({
    coursesSize: DEFAULT_COURSES_SIZE,
    studentsSize: DEFAULT_STUDENTS_SIZE
  }));
}

await generateSeedScripts();
