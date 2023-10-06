import { db } from './db';
import bcrypt from 'bcrypt';
import { generateAccessToken } from './utils/jwt';
import dayjs from 'dayjs';

export const globalUserCredentials = {
  email: '123456@student.uwm.edu.pl',
  password: 'JohRam682&',
  firstName: 'John',
  lastName: 'Doe',
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
  const student = await db.user
    .create({
      data: {
        email: globalUserCredentials.email,
        password: bcrypt.hashSync(globalUserCredentials.password, 12),
        firstName: globalUserCredentials.firstName,
        lastName: globalUserCredentials.lastName,
      },
    })
    .then((user) => {
      return db.student.create({
        data: {
          indexNumber: 654321,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });
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

  const group = await db.group.create({
    data: {
      name: 'Test Group 2',
      Lecturer: {
        connect: {
          id: lecturer.id,
        },
      },
    },
  });

  const lesson = await db.lesson.create({
    data: {
      number: 20,
      image: 'example photo',
      Group: {
        connect: {
          id: group.id,
        },
      },
    },
  });

  const task = await db.task.create({
    data: {
      number: 15,
      question: 'Is kot pies?',
      closeDate: dayjs().add(7, 'day').toDate(),
      isExtra: false,
      Lesson: {
        connect: {
          id: lesson.id,
        },
      },
    },
  });

  const validToken = generateAccessToken({ userId: student.id }, '15m');
  process.env.VALID_ACCESS_TOKEN_FOR_TESTING = validToken;
  process.env.LECTURER_ID_FOR_TESTING = lecturer.id.toString();
  process.env.GROUP_ID_FOR_TESTING = group.id.toString();
  process.env.LESSON_ID_FOR_TESTING = lesson.id.toString();
  process.env.TASK_ID_FOR_TESTING = task.id.toString();
  process.env.STUDENT_ID_FOR_TESTING = student.id.toString();
};

export default setup;
