import { TUserRole } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
}
