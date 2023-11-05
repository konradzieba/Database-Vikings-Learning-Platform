import { Group, Lecturer, Prisma } from '@prisma/client';
import { db } from '../../db';

export async function getGroups(id: Lecturer['id']) {
  const groupsInfo = await db.group.findMany({
    where: {
      lecturerId: id,
    },
    include: {
      students: {
        select: {
          id: true,
        },
      },
      lessons: {
        select: {
          id: true,
        },
      },
    },
  });

  const lecturerGroups = groupsInfo.map((group) => ({
    groupId: group.id,
    groupName: group.name,
    lessonsCount: group.lessons.length,
    studentsCount: group.students.length,
  }));

  return lecturerGroups;
}

export async function getStudentsFromGroup(id: Group['id']) {
  const selectedStudentInfo = await db.student.findMany({
    where: {
      groupId: id,
    },
    select: {
      id: true,
      indexNumber: true,
      score: true,
      health: true,
      lastLogin: true,
      userId: true,
      groupId: true,
    },
  });

  const selectedUserInfo = await db.student.findMany({
    where: {
      groupId: id,
    },
    include: {
      User: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  const combinedData = selectedStudentInfo.map((student) => {
    const userInfo = selectedUserInfo.find((info) => info.id === student.id);
    if (userInfo) {
      return {
        ...student,
        ...userInfo.User,
      };
    }
    return student;
  });

  return combinedData;
}

export function createGroup(group: Prisma.GroupCreateInput) {
  return db.group.create({
    data: group,
  });
}

export function findLecturerById(id: Lecturer['id']) {
  return db.lecturer.findUnique({
    where: {
      id,
    },
  });
}

export function findGroupByName(name: Group['name']) {
  return db.group.findUnique({
    where: {
      name,
    },
  });
}

export function findGroupById(id: Group['id']) {
  return db.group.findUnique({
    where: {
      id,
    },
  });
}

export function renameGroup(
  id: Group['id'],
  group: Pick<Prisma.GroupUpdateInput, 'name'>
) {
  return db.group.update({
    where: {
      id,
    },
    data: group,
  });
}

export function deleteGroup(id: Group['id']) {
  return db.group.delete({
    where: {
      id,
    },
  });
}
