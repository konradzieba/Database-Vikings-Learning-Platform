import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as TaskSchemas from './tasks.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';
import * as TasksControllers from '../tasks/tasks.controllers';

const router = Router();

router.post(
  '/createTask',
  validateRequest({ body: TaskSchemas.taskSchema }),
  TasksControllers.createTask
);

router.patch('/updateTask/:id', validateRequest({params: paramsWithIdSchema, body: TaskSchemas.updateTaskSchema}), TasksControllers.updateTask);

router.delete(
  '/deleteTask/:id',
  validateRequest({ params: paramsWithIdSchema }),
  TasksControllers.deleteTask
);

export default router;
