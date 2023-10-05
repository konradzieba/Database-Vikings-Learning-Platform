import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as GroupsControllers from '../groups/groups.controllers';
import { groupSchema } from 'api/groups/groups.schemas';

const router = Router();

router.post(
  '/createLesson',
  validateRequest({ body: groupSchema}),
  GroupsControllers.createGroup
);


export default router;
