import * as bcrypt from 'bcrypt';
import { db } from '../../db';
import type { User, Prisma, Student } from '@prisma/client';

export function findUserById(id: User['id']) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export function findStudentByUserId(userId: number) {
  return db.student.findUnique({
    where: {
      userId: userId,
    },
  });
}

// export function findStudentGroup(userId: number) {
//   return db.student.
// }

export function findLecturerByUserId(userId: number) {
  return db.lecturer.findUnique({
    where: {
      userId: userId,
    },
  });
}

export function findStudentByIndexNumber(indexNumber: Student['indexNumber']) {
  return db.user.findUnique({
    where: {
      email: `${indexNumber}@student.uwm.edu.pl`,
    },
  });
}

export function createUser(user: Prisma.UserCreateInput) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

export function createLecturer(
  lecturer: Omit<Prisma.LecturerCreateInput, 'isAdmin'>
) {
  return db.lecturer.create({
    data: { ...lecturer, isAdmin: false },
  });
}

export function createSuperUser(
  superUser: Omit<Prisma.LecturerCreateInput, 'isAdmin'>
) {
  return db.lecturer.create({
    data: { ...superUser, isAdmin: true },
  });
}

export function createStudent(student: Prisma.StudentCreateInput) {
  return db.student.create({
    data: student,
  });
}

export async function changePassword(id: User['id'], password: string) {
  const student = await db.student.findUnique({
    where: { userId: id },
  });

  if (!student) {
    throw new Error(`Student with userID ${id} not found`);
  }

  await db.student.update({
    where: { id: student.id },
    data: {
      isPasswordChanged: {
        set: true,
      },
    },
  });

  await db.user.update({
    where: {
      id,
    },
    data: {
      password: bcrypt.hashSync(password, 12),
    },
  });
}

export function updateUser(id: User['id'], user: Prisma.UserUpdateInput) {
  return db.user.update({
    where: {
      id,
    },
    data: {
      ...user,
      password: user.password
        ? bcrypt.hashSync(user.password as string, 12)
        : undefined,
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
