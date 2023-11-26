import { Router } from 'express';
import {
  requireUser,
  validateRequest,
  validateRequestAndCheckRole,
} from '../../middlewares';
import {
  paramsWithIdSchema,
  paramsWithLessonIdSchema,
} from '../../interfaces/ParamsWithId';
import * as LessonsControllers from '../lessons/lessons.controllers';
import * as LessonSchemas from './lessons.schemas';
import { EnumRole } from '../../../typings/token';

const router = Router();

router.get(
  '/getLessonsByGroupId/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  LessonsControllers.getLessonsByGroupId
);

router.get(
  '/getPreviousLessonsImages/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  LessonsControllers.getPreviousLessonsImages
);

router.get(
  '/getLessonInfoByGroupAndLessonId/:id/:lessonId',
  validateRequestAndCheckRole(
    { params: paramsWithLessonIdSchema },
    EnumRole.LECTURER
  ),
  LessonsControllers.getLessonInfoByGroupAndLessonId
);

router.get(
  '/getTasksByLessonId/:id',
  validateRequestAndCheckRole({ params: paramsWithIdSchema }, EnumRole.STUDENT),
  LessonsControllers.getTasksByLessonId
);

router.get(
  '/getStudentLessonsInfo',
  validateRequestAndCheckRole({}, EnumRole.STUDENT),
  LessonsControllers.getStudentLessonsInfo
);

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

router.get(
  '/getPreDeleteLessonInfo/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  LessonsControllers.getPreDeleteLessonInfo
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
