import { Router } from 'express';
import { validateRequestAndCheckRole } from '../../middlewares';
import * as TaskSchemas from './tasks.schemas';
import {
  paramsWithIdSchema,
  paramsWithLessonIdSchema,
} from '../../interfaces/ParamsWithId';
import * as TasksControllers from '../tasks/tasks.controllers';
import { EnumRole } from '../../../typings/token';

const router = Router();

router.get(
  '/getLessonTaskById/:lessonId/:id',
  validateRequestAndCheckRole(
    { params: paramsWithLessonIdSchema },
    EnumRole.STUDENT
  ),
  TasksControllers.getLessonTaksById
);

router.post(
  '/createTask',
  validateRequestAndCheckRole(
    { body: TaskSchemas.taskSchema },
    EnumRole.LECTURER
  ),
  TasksControllers.createTask
);

router.patch(
  '/updateTask/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: TaskSchemas.updateTaskSchema,
    },
    EnumRole.LECTURER
  ),
  TasksControllers.updateTask
);

router.delete(
  '/deleteTask/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  TasksControllers.deleteTask
);

export default router;
