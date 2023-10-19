import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

export const authenticatedUser = async (req, res, next) => {
  const { Usertoken } = req.cookies;
  if (!Usertoken) throw new UnauthenticatedError("authentication error");

  try {
    const verifiedJWT = await jwt.verify(Usertoken, process.env.JWT_SECRET);
    req.user = verifiedJWT;
    const { userId, role } = verifiedJWT;
    const testUser = userId == "651558e58be1875a37b55655";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication error");
  }
};

export const authorizedPermissionToStats = (req, res, next) => {
  const isAdmin = req.user.role === "admin";
  if (!isAdmin)
    throw new UnauthorizedError("you are not authorized to visit this route");
  next();
};

export const checkTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!!");
  }
  next();
};
