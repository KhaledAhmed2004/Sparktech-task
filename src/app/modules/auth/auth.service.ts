import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const AuthServices = { loginUser };
