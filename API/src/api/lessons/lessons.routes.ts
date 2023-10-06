import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as LessonsControllers from '../lessons/lessons.controllers';
import { createLessonSchema } from './lessons.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';

const router = Router();

router.post(
  '/createLesson',
  validateRequest({ body: createLessonSchema }),
  LessonsControllers.createLesson
);

router.delete(
  '/deleteLesson/:id',
  validateRequest({ params: paramsWithIdSchema }),
  LessonsControllers.deleteLesson
);

export default router;
