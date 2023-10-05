import { db } from './db';
import bcrypt from 'bcrypt';
import { generateAccessToken } from './utils/jwt';

export const globalUserCredentials = {
  email: 'mihai@test.com',
  password: 'JohRam682&',
  firstName: 'John',
  lastName: 'Rambo',
  indexNumber: 123456,
};

export const globalLecturerCredentials = {
  email: 'lecturer@lecturer.pl',
  password: 'lecturer123',
  firstName: 'FirstName',
  lastName: 'LastName',
  isAdmin: true,
};

export const globalGroupCredentials = {
  name: 'Test Group',
  lecturerId: 1,
};

const setup = async () => {
  console.log('---------TESTS STARTED--------');

  // student setup
  const student = await db.user.create({
    data: {
      email: globalUserCredentials.email,
      password: bcrypt.hashSync(globalUserCredentials.password, 12),
      firstName: globalUserCredentials.firstName,
      lastName: globalUserCredentials.lastName,
    },
  });

  const lecturer = await db.user
    .create({
      data: {
        email: globalLecturerCredentials.email,
        password: bcrypt.hashSync(globalLecturerCredentials.password, 12),
        firstName: globalLecturerCredentials.firstName,
        lastName: globalLecturerCredentials.lastName,
      },
    })
    .then((user) => {
      return db.lecturer.create({
        data: {
          isAdmin: globalLecturerCredentials.isAdmin,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    });

  const validToken = generateAccessToken({ userId: student.id }, '15m');
  process.env.VALID_ACCESS_TOKEN_FOR_TESTING = validToken;
  process.env.LECTURER_ID_FOR_TESTING = lecturer.id.toString();
};

export default setup;
