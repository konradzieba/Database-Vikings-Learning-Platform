import { Router } from 'express';
import { validateRequestAndCheckRole } from '../../middlewares';
import * as GroupsControllers from './groups.controllers';
import * as GroupSchemas from './groups.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';
import { EnumRole } from '../../../typings/token';

const router = Router();

router.get(
  '/getGroupInfo/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.getGroupInfo
);

router.get(
  '/getGroupsByLecturerId/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.getGroupsByLecturerId
);

router.get(
  '/getStudentsFromGroup/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.getStudentsFromGroup
);

router.get(
  '/getPreDeleteGroupInfo/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.getPreDeleteGroupInfo
);

router.patch(
  '/changeStudentGroup/:id',
  validateRequestAndCheckRole(
    { body: GroupSchemas.changeStudentGroupInput, params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.changeStudentGroup
);

router.post(
  '/createGroup',
  validateRequestAndCheckRole(
    { body: GroupSchemas.groupSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.createGroup
);

router.patch(
  '/renameGroup/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: GroupSchemas.renameGroupInput,
    },
    EnumRole.LECTURER
  ),
  GroupsControllers.renameGroup
);

router.delete(
  '/deleteGroup/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.deleteGroup
);

export default router;
