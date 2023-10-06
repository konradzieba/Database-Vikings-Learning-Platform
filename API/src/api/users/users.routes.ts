import { Router } from 'express';
import { requireUser, validateRequest } from '../../middlewares';
import * as UserController from './users.controllers';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';

const router = Router();

router.get('/me', requireUser, UserController.me);

router.delete(
  '/deleteUser/:id',
  validateRequest({ params: paramsWithIdSchema }),
  UserController.deleteUser
);

export default router;
