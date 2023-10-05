import { Prisma } from '@prisma/client';
import { db } from '../../db';

export function createGroup(group: Prisma.GroupCreateInput) {
  return db.group.create({
    data: group,
  });
}

export function findGroupByName(name: string) {
  return db.group.findUnique({
    where: {
      name,
    },
  });
}

export function findGroupById(id: number) {
  return db.group.findUnique({
    where: {
      id,
    },
  });
}
