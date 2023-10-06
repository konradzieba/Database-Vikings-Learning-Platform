import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as TasksControllers from '../tasks/tasks.controllers';
import { taskSchema } from './tasks.schemas';

const router = Router();

router.post(
  '/createTask',
  validateRequest({ body: taskSchema }),
  TasksControllers.createTask
);

router.delete(
  '/deleteTask',
  TasksControllers.deleteTask
);

export default router;
