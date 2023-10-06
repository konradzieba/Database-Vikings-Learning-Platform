import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as TasksControllers from '../tasks/tasks.controllers';
import { taskSchema } from './tasks.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';

const router = Router();

router.post(
  '/createTask',
  validateRequest({ body: taskSchema }),
  TasksControllers.createTask
);

router.delete(
  '/deleteTask/:id',
  validateRequest({params: paramsWithIdSchema}),
  TasksControllers.deleteTask
);

export default router;
