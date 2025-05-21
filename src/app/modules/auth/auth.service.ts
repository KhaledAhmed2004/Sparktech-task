import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";
import config from "../../config";

const loginUser = async (payload: ILoginUser) => {
  // Find user by email and include password for verification
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Verify password using bcrypt
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // Prepare JWT payload
  const jwtPayloads = {
    userId: user._id.toString(),
    role: user.role,
  };

  // Create access and refresh tokens
  const accessToken = createToken(
    jwtPayloads,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayloads,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  // Return user data and tokens
  return { user, accessToken, refreshToken };
};

export const AuthServices = { loginUser };
