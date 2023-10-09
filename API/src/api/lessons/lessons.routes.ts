import { Router } from 'express';
import { validateRequestAndCheckRole } from '../../middlewares';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';
import * as LessonsControllers from '../lessons/lessons.controllers';
import * as LessonSchemas from './lessons.schemas';
import { EnumRole } from '../../../typings/token';

const router = Router();

router.post(
  '/createLesson',
  validateRequestAndCheckRole(
    { body: LessonSchemas.createLessonSchema },
    EnumRole.LECTURER
  ),
  LessonsControllers.createLesson
);

router.patch(
  '/updateLesson/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: LessonSchemas.updateLessonSchema,
    },
    EnumRole.LECTURER
  ),
  LessonsControllers.updateLesson
);

router.delete(
  '/deleteLesson/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  LessonsControllers.deleteLesson
);

export default router;
