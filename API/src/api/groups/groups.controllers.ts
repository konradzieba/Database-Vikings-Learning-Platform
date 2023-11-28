import { Response, Request, NextFunction } from 'express';
import * as GroupSchemas from './groups.schemas';
import { ParamsWithId } from 'interfaces/ParamsWithId';
import MessageResponse from 'interfaces/MessageResponse';
import * as GroupServices from './groups.services';
import * as LessonsServices from '../lessons/lessons.services';
import * as UserServices from '../users/users.services';
import { db } from '../../db';

export async function getGroupsByLecturerId(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingLecturer = await UserServices.findLecturerById(+id);

    if (!existingLecturer) {
      res.status(404);
      throw new Error('Lecturer with this id does not exist.');
    }

    const groups = await GroupServices.getGroups(+id);

    res.json({ message: 'success', groups: groups });
  } catch (error) {
    next(error);
  }
}

export async function getStudentsFromGroup(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingGroup = await GroupServices.findGroupById(+id);

    if (!existingGroup) {
      res.status(404);
      throw new Error('Group with this id does not exist.');
    }

    const studentList = await GroupServices.getStudentsFromGroup(+id);

    res.json({ message: 'success', students: studentList });
  } catch (error) {
    next(error);
  }
}

export async function createGroup(
  req: Request<{}, MessageResponse, GroupSchemas.GroupInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { name, lecturerId } = req.body;

    const existingGroup = await GroupServices.findGroupByName(name);

    if (existingGroup) {
      res.status(400);
      throw new Error('Group with this name already exists.');
    }

    const group = await GroupServices.createGroup({
      name,
      Lecturer: { connect: { id: lecturerId } },
    });

    res.json({
      message: `Group ${group.name} created successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function changeStudentGroup(
  req: Request<
    ParamsWithId,
    MessageResponse,
    GroupSchemas.ChangeStudentGroupInput
  >,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id: studentId } = req.params;
    const { groupId: newGroupId } = req.body;

    const existingGroup = await GroupServices.findGroupById(+newGroupId);

    if (!existingGroup) {
      res.status(404);
      throw new Error('Group with this id does not exist.');
    }

    const existingStudent = await UserServices.findStudentByStudentId(
      +studentId
    );

    if (!existingStudent) {
      res.status(404);
      throw new Error('Student with this id does not exist.');
    }

    const student = await GroupServices.changeStudentGroup(
      +studentId,
      newGroupId
    );

    res.json({
      message: `Student with ${student.id} moved to group number ${existingGroup.name} successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function renameGroup(
  req: Request<ParamsWithId, MessageResponse, GroupSchemas.RenameGroupInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name: newName } = req.body;

    const existingGroup = await GroupServices.findGroupById(+id);

    if (!existingGroup) {
      res.status(404);
      throw new Error('Group with this id does not exist.');
    }

    const group = await GroupServices.renameGroup(+id, {
      name: newName,
    });

    res.json({
      message: `Group with ${group.id} updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteGroup(
  req: Request<ParamsWithId, MessageResponse>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id: groupId } = req.params;

    const existingGroup = await GroupServices.findGroupById(+groupId);

    if (!existingGroup) {
      res.status(404);
      throw new Error('Group with this id does not exist.');
    }

    const assignedUserIds = (
      await GroupServices.getStudentsFromGroup(+groupId)
    ).map((student) => student.id);

    await db.$transaction([
      GroupServices.deleteGroup(+groupId),
      UserServices.deleteManyUsers(assignedUserIds),
    ]);

    res.json({
      message: `Group with ${existingGroup.id}, number ${existingGroup.name} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  } finally {
    await db.$disconnect();
  }
}
