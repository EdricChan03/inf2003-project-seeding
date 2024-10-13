import { faker, type SexType } from '@faker-js/faker';
import type { Ethnicity, Role } from '../tables/student';

const phoneNumRegex = /[8-9][0-9]{7}/;

export interface User {
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  sex: SexType;
  ethnicity: Ethnicity;
  role: Role;
}

export const createRandomUser = (): User => {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();

  const fullName = faker.person.fullName({ firstName, lastName, sex });

  const phoneNumber = faker.helpers.fromRegExp(phoneNumRegex);

  const email = faker.internet.email({ firstName, lastName });

  return {
    birthday: faker.date.birthdate({ mode: 'age', min: 18, max: 50 }),
    email,
    firstName,
    lastName,
    fullName,
    sex,
    phoneNumber,
    ethnicity: faker.helpers.arrayElement(['chinese', 'indian', 'malay', 'other']),
    role: faker.helpers.arrayElement(['admin', 'user'])
  };
}
