import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as AuthControllers from './auth.controllers';
import {
  loginQuerySchema,
  loginSchema,
  registerQuerySchema,
  registerSchema,
  refreshTokenSchema,
  registerLecturerSchema,
} from './auth.schemas';

const router = Router();

router.post(
  '/register',
  validateRequest({ query: registerQuerySchema, body: registerSchema }),
  AuthControllers.register
);

router.post(
  '/registerLecturer',
  validateRequest({
    query: registerQuerySchema,
    body: registerLecturerSchema,
  }),
  AuthControllers.registerLecturer
);

router.post(
  '/login',
  validateRequest({ query: loginQuerySchema, body: loginSchema }),
  AuthControllers.login
);

router.post(
  '/refreshToken',
  validateRequest({ query: loginQuerySchema, body: refreshTokenSchema }),
  AuthControllers.refreshTokens
);

export default router;
