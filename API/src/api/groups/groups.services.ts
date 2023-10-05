import { Group, Prisma } from '@prisma/client';
import { db } from '../../db';

export function createGroup(group: Prisma.GroupCreateInput) {
  return db.group.create({
    data: group,
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

export function deleteGroup(id: Group['id']) {
  return db.group.delete({
    where: {
      id,
    },
  });
}
