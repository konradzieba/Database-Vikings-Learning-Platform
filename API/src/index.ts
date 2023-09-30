import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import Prisma from './db/prisma';
import { env } from 'process';

dotenv.config();

const PORT = env.PORT || 3000;

const app = express();

app.get('/healthchecker', async (req: Request, res: Response) => {
  res.send(`Application is running on port ${PORT} and database is connected!`);
});

app.get('/', async (req: Request, res: Response) => {
  //   await Prisma.user.create({
  //     data: {
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       email: 'jondoe123@gmail.com',
  //       password: 'test123',
  //     },
  //   });

  const users = await Prisma.user.findMany();

  const names = users.map((user) => `${user.firstName} ${user.lastName} `);
  const admin = await Prisma.lecturer.findFirst();
  res.send(
    `There are ${names.length} users with the names of: ${names.join(
      ', '
    )} and John Doe ${admin?.isAdmin ? 'is admin' : 'is not admin'}`
  );
});

app.get('/groups', async (req: Request, res: Response) => {
  const groups = await Prisma.group.findMany();
  const lessons = await Prisma.lesson.findMany({
    where: { groupId: groups[0].id },
  });
  const tasks = await Prisma.task.findMany({
    where: { lessonId: lessons[0].id },
  });
  res.send({ data: [groups, lessons, { tasks: tasks }] });
  res.send(lessons);
});

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});
