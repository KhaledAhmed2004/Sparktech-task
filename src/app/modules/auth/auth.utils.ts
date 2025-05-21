import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

// Function to create a JWT token
export const createToken = (
  jwtPayloads: { userId: string; role: string },
  secret: string,
  expireIn: string
) => {
  return jwt.sign(
    jwtPayloads,
    secret as Secret,
    { expiresIn: expireIn } as SignOptions
  );
};

// Function to verify a JWT token
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret as Secret) as JwtPayload;
};
