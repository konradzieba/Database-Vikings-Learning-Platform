import { Response, Request, NextFunction } from 'express';
import { EnumRole, ParsedToken } from '../../../typings/token';
import { ParamsWithId } from 'interfaces/ParamsWithId';
import { UpdateStudentInput, UpdateUserInput } from './users.schemas';
import MessageResponse from 'interfaces/MessageResponse';
import * as UserServices from './users.services';
import * as GroupServices from '../groups/groups.services';

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedToken: ParsedToken = req.user;
    const user = await UserServices.findUserById(parsedToken.userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    if (user.role === EnumRole.STUDENT) {
      const student = await UserServices.findStudentByUserId(user.id);

      if (!student) {
        res.status(404);
        throw new Error('Student not found');
      }
      const studentGroup = await GroupServices.findGroupById(student.groupId);

      if (!studentGroup) {
        res.status(404);
        throw new Error('Student group not found');
      }

      if (student) {
        res.json({
          ...userData,
          studentInfos: {
            studentId: student.id,
            indexNumber: student.indexNumber,
            score: student.score,
            health: student.health,
            // rank: student.rank,
            isPasswordChanged: student.isPasswordChanged,
            groupId: student.groupId,
            answersId: student.answersId,
            lecturerId: studentGroup.lecturerId,
          },
        });
      } else {
        res.status(404);
        throw new Error('Student not found');
      }
    }

    if (user.role === EnumRole.LECTURER || user.role === EnumRole.SUPERUSER) {
      const lecturer = await UserServices.findLecturerByUserId(user.id);
      if (lecturer) {
        res.json({
          ...userData,
          lecturerInfos: {
            lecturerId: lecturer.id,
            isAdmin: lecturer.isAdmin,
            idCheck: lecturer.userId,
          },
        });
      } else {
        res.status(404);
        throw new Error('Lecturer not found');
      }
    }
  } catch (error) {
    next(error);
  }
}

export async function getScoreBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedToken: ParsedToken = req.user;
    const isStudent = parsedToken.role === EnumRole.STUDENT;

    const scoreBoard = await UserServices.getScoreBoard(isStudent);

    res.json({ message: 'success', scoreBoard: scoreBoard });
  } catch (error) {
    next(error);
  }
}

export async function getStudentPreviewData(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { role } = req.user;
    const { id: studentId } = req.params;

    const student = await UserServices.findStudentByStudentId(+studentId);

    if (!student) {
      res.status(404);
      throw new Error('Student with given id does not exists');
    }

    const studentPreviewData = await UserServices.getStudentPreviewData(
      +studentId,
      role
    );

    res.json({
      message: 'success',
      studentData: studentPreviewData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getStudentDefaultPasswordState(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedToken: ParsedToken = req.user;

    const student = await UserServices.getStudentDefaultPasswordState(
      parsedToken.userId
    );

    if (!student) {
      res.status(404);
      throw new Error('Student with given userId does not exists');
    }

    res.json({
      message: 'success',
      isDefaultPasswordChanged: student.isPasswordChanged,
    });
  } catch (error) {
    next(error);
  }
}

export async function changeDefaultPassword(
  req: Request<ParamsWithId, {}, { password: string }>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const parsedToken: ParsedToken = req.user;
    const { password } = req.body;

    const user = await UserServices.findUserById(parsedToken.userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    await UserServices.changeDefaultPassword(user.id, password);

    res.json({
      message: 'Password changed successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request<ParamsWithId, {}, UpdateUserInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { firstName, lastName, password, role } = req.body;

    const user = await UserServices.findUserById(+id);

    if (!user) {
      res.status(404);
      throw new Error(`User with given id doesn't exists.`);
    }

    await UserServices.updateUser(+id, {
      firstName,
      lastName,
      password,
      role,
    });

    res.json({
      message: `User with id: ${id} was updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateStudent(
  req: Request<ParamsWithId, {}, UpdateStudentInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id: studentId } = req.params;
    const { firstName, lastName, indexNumber, score, health } = req.body;

    const student = await UserServices.findStudentByStudentId(+studentId);

    if (!student) {
      res.status(404);
      throw new Error(`User with given id doesn't exists.`);
    }

    await UserServices.updateStudent(+studentId, {
      firstName,
      lastName,
      indexNumber,
      score,
      health,
    });

    res.json({
      message: `Student with id: ${studentId} was updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function restoreDefaultPassword(
  req: Request<ParamsWithId>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id: studentId } = req.params;

    const student = await UserServices.findStudentByStudentId(+studentId);

    if (!student) {
      res.status(404);
      throw new Error(`Student with given id doesn't exists.`);
    }

    await UserServices.restoreDefaultPassword(+studentId);

    res.json({
      message: `Password for student with indexNumber: ${student.indexNumber} was restored successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request<ParamsWithId>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const user = await UserServices.findUserById(+id);

    if (!user) {
      res.status(404);
      throw new Error(`User with given id doesn't exists.`);
    }

    await UserServices.deleteUser(+id);

    res.json({
      message: `User with id: ${id} was deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
