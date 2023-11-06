import { Response, Request, NextFunction } from 'express';
import * as GroupSchemas from './groups.schemas';
import { ParamsWithId } from 'interfaces/ParamsWithId';
import MessageResponse from 'interfaces/MessageResponse';
import * as GroupServices from './groups.services';

export async function getGroups(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingLecturer = await GroupServices.findLecturerById(+id);

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

export async function renameGroup(
  req: Request<ParamsWithId, MessageResponse, GroupSchemas.RenameGroupInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingGroup = await GroupServices.findGroupById(+id);

    if (!existingGroup) {
      res.status(404);
      throw new Error('Group with this id does not exist.');
    }

    const group = await GroupServices.renameGroup(+id, {
      name,
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
    const { id } = req.params;

    const existingGroup = await GroupServices.findGroupById(+id);

    if (!existingGroup) {
      res.status(404);
      throw new Error('Group with this id does not exist.');
    }

    const group = await GroupServices.deleteGroup(+id);

    res.json({
      message: `Group with ${group.id}, number ${group.name} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
