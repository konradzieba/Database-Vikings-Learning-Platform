import * as bcrypt from 'bcrypt';
import { db } from '../../db';
import type { User, Prisma } from '@prisma/client';

export function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export function createUser(user: Prisma.UserCreateInput) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

export function createLecturer(lecturer: Prisma.LecturerCreateInput) {
  return db.lecturer.create({
    data: lecturer,
  });
}

export function createStudent(student: Prisma.StudentCreateInput) {
  return db.student.create({
    data: student,
  });
}

export function findUserById(id: User['id']) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export function deleteUser(id: User['id']) {
  return db.user.delete({
    where: {
      id,
    },
  });
}

