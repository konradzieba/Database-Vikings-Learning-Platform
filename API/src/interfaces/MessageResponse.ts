import { EnumRole } from '../../typings/token';

export default interface MessageResponse {
  message: string;
}

export interface LoginResponse extends MessageResponse {
  role: keyof typeof EnumRole;
}
