import { db } from './db';
import bcrypt from 'bcrypt';
import { generateAccessToken } from './utils/jwt';
import dayjs from 'dayjs';
import { Role } from '@prisma/client';
import {
  globalUserCredentials,
  globalLecturerCredentials,
  globalSuperUserCredentials,
} from './mocks/globalCredentials';
const setup = async () => {
  console.log('---------TESTS STARTED--------');

  const user = await db.user.create({
    data: {
      email: 'user@example.com',
      password: bcrypt.hashSync(globalUserCredentials.password, 12),
      firstName: 'John',
      lastName: 'Cena',
    },
  });

  const userToDelete = await db.user.create({
    data: {
      email: 'user@todelete.com',
      password: bcrypt.hashSync(globalUserCredentials.password, 12),
      firstName: 'User',
      lastName: 'Delete',
    },
  });

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

  const superuser = await db.user
    .create({
      data: {
        email: globalSuperUserCredentials.email,
        password: bcrypt.hashSync(globalSuperUserCredentials.password, 12),
        firstName: globalSuperUserCredentials.firstName,
        lastName: globalSuperUserCredentials.lastName,
      },
    })
    .then((user) => {
      return db.lecturer.create({
        data: {
          isAdmin: globalSuperUserCredentials.isAdmin,
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

  const groupToDelete = await db.group.create({
    data: {
      name: 'Group to delete',
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

  const lessonToDelete = await db.lesson.create({
    data: {
      number: 7,
      image: 'Lesson to delete',
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
      Lesson: {
        connect: {
          id: lesson.id,
        },
      },
    },
  });

  const task2 = await db.task.create({
    data: {
      number: 16,
      question: 'Is kot pies?',
      closeDate: dayjs().add(7, 'day').toDate(),
      Lesson: {
        connect: {
          id: lesson.id,
        },
      },
    },
  });

  const taskToDelete = await db.task.create({
    data: {
      number: 61,
      question: 'Will I be removed?',
      closeDate: dayjs().add(7, 'day').toDate(),
      Lesson: {
        connect: {
          id: lesson.id,
        },
      },
    },
  });

  const answerToUpdate = await db.answer.create({
    data: {
      solution: 'GlobalSetup Solution',
      Task: {
        connect: {
          id: task2.id,
        },
      },
      Student: {
        connect: {
          id: student.id,
        },
      },
    },
  });

  const validToken = generateAccessToken(
    { userId: user.id, role: Role.SUPERUSER },
    '15m'
  );

  const invalidToken = generateAccessToken(
    { userId: 9999, role: Role.SUPERUSER },
    '15m'
  );
  const validStudentToken = generateAccessToken(
    {
      userId: student.userId,
      role: Role.STUDENT,
    },
    '15m'
  );
  const validLecturerToken = generateAccessToken(
    {
      userId: lecturer.userId,
      role: Role.LECTURER,
    },
    '15m'
  );
  const validSuperUserToken = generateAccessToken(
    {
      userId: superuser.userId,
      role: Role.SUPERUSER,
    },
    '15m'
  );

  process.env.VALID_SUPERUSER_TOKEN_FOR_TESTING = validSuperUserToken;
  process.env.VALID_ACCESS_TOKEN_FOR_TESTING = validToken;
  process.env.INVALID_ACCESS_TOKEN_FOR_TESTING = invalidToken;
  process.env.VALID_LECTURER_TOKEN_FOR_TESTING = validLecturerToken;
  process.env.VALID_STUDENT_TOKEN_FOR_TESTING = validStudentToken;

  process.env.LECTURER_ID_FOR_TESTING = lecturer.id.toString();
  process.env.GROUP_ID_FOR_TESTING = group.id.toString();
  process.env.LESSON_ID_FOR_TESTING = lesson.id.toString();
  process.env.TASK_ID_FOR_TESTING = task.id.toString();
  process.env.STUDENT_ID_FOR_TESTING = student.id.toString();

  process.env.ANSWER_ID_FOR_UPDATE_TESTING = answerToUpdate.id.toString();

  process.env.GROUP_ID_TO_DELETE_TESTING = groupToDelete.id.toString();
  process.env.LESSON_ID_TO_DELETE_TESTING = lessonToDelete.id.toString();
  process.env.TASK_ID_TO_DELETE_TESTING = taskToDelete.id.toString();
  process.env.USER_ID_TO_DELETE_TESTING = userToDelete.id.toString();
};

export default setup;
