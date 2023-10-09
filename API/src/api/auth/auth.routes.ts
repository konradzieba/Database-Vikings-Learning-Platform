import { Router } from 'express';
import {
  validateRequest,
  validateRequestAndCheckRole,
} from '../../middlewares';
import * as AuthControllers from './auth.controllers';
import * as AuthSchemas from './auth.schemas';
import { paramsWithIdSchema } from 'interfaces/ParamsWithId';
import { EnumRole } from '../../../typings/token';

const router = Router();

router.post(
  '/register',
  validateRequest({
    query: AuthSchemas.registerQuerySchema,
    body: AuthSchemas.registerStudentSchema,
  }),
  AuthControllers.registerStudent
);

// router.post(
//   '/registerLecturer',
//   validateRequest({
//     query: AuthSchemas.registerQuerySchema,
//     body: AuthSchemas.registerLecturerSchema,
//   }),
//   AuthControllers.registerLecturer
// );

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
  '/login',
  validateRequest({
    query: AuthSchemas.loginQuerySchema,
    body: AuthSchemas.loginSchema,
  }),
  AuthControllers.login
);

router.post(
  '/refreshToken',
  validateRequest({
    query: AuthSchemas.loginQuerySchema,
    body: AuthSchemas.refreshTokenSchema,
  }),
  AuthControllers.refreshTokens
);

export default router;
