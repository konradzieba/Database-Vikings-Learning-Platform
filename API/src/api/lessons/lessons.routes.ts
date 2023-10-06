import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';
import * as LessonsControllers from '../lessons/lessons.controllers';
import * as LessonSchemas from './lessons.schemas';

const router = Router();

router.post(
  '/createLesson',
  validateRequest({ body: LessonSchemas.createLessonSchema }),
  LessonsControllers.createLesson
);

router.delete(
  '/deleteLesson/:id',
  validateRequest({ params: paramsWithIdSchema }),
  LessonsControllers.deleteLesson
);

export default router;
