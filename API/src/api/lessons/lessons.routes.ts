import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as LessonsControllers from '../lessons/lessons.controllers';
import { createLessonSchema } from './lessons.schemas';

const router = Router();

router.post(
  '/createLesson',
  validateRequest({ body: createLessonSchema }),
  LessonsControllers.createLesson
);

export default router;
