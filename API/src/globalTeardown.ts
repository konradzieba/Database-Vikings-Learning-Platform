import { db } from './db';
import { globalUserCredentials } from './globalSetup';

const teardown = async () => {
  await db.user.deleteMany();
  console.log('---------TESTS FINISHED--------');
};

export default teardown;
