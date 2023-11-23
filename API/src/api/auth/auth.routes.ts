import { Router } from 'express';
import {
  requireUser,
  validateRequest,
  validateRequestAndCheckRole,
} from '../../middlewares';
import * as AuthControllers from './auth.controllers';
import * as AuthSchemas from './auth.schemas';
import { EnumRole } from '../../../typings/token';

const router = Router();

router.post(
  '/registerManyStudents',
  validateRequestAndCheckRole(
    {
      query: AuthSchemas.registerQuerySchema,
      body: AuthSchemas.registerManyStudentsSchema,
    },
    EnumRole.LECTURER
  ),
  AuthControllers.registerManyStudents
);

router.post(
  '/register',
  validateRequest({
    query: AuthSchemas.registerQuerySchema,
    body: AuthSchemas.registerStudentSchema,
  }),
  AuthControllers.registerStudent
);

router.post(
  '/registerLecturer',
  validateRequestAndCheckRole(
    {
      query: AuthSchemas.registerQuerySchema,
      body: AuthSchemas.registerLecturerSchema,
    },
    EnumRole.LECTURER
  ),
  AuthControllers.registerLecturer
);

router.post(
  '/registerSuperUser',
  validateRequestAndCheckRole(
    {
      query: AuthSchemas.registerQuerySchema,
      body: AuthSchemas.registerSuperUserSchema,
    },
    EnumRole.SUPERUSER
  ),
  AuthControllers.registerSuperUser
);

router.post(
  '/login',
  validateRequest({
    body: AuthSchemas.loginSchema,
  }),
  AuthControllers.login
);

router.post(
  '/refreshToken',
  validateRequest({
    body: AuthSchemas.refreshTokenSchema,
  }),
  AuthControllers.refreshTokens
);

router.post('/checkRole', requireUser, AuthControllers.checkRole);

router.post('/logout', requireUser, AuthControllers.logout);

export default router;
