import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as AuthControllers from './auth.controllers';
import * as AuthSchemas from './auth.schemas';

const router = Router();

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
  validateRequest({
    query: AuthSchemas.registerQuerySchema,
    body: AuthSchemas.registerLecturerSchema,
  }),
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
