export enum EnumRole {
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  SUPERUSER = 'SUPERUSER',
}

export type TRole = keyof typeof EnumRole;

export interface ParsedToken {
  exp: number;
  userId: number;
  role: TRole;
}
