import { db } from './db';

const teardown = async () => {
  await db.answer.deleteMany();
  await db.task.deleteMany();
  await db.lesson.deleteMany();
  await db.group.deleteMany();
  await db.user.deleteMany();
  console.log('---------TESTS FINISHED--------');
};

export default teardown;
