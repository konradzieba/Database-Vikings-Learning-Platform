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
