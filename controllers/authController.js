import express from "express";
import mongoose from "mongoose";
import authModels from "../models/authModels.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/jwTokenUtil.js";

export const register = async (req, res) => {
  const isFirstAccount = (await authModels.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const userRegister = await authModels.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const verifiedEmail = await authModels.findOne({ email: req.body.email });
  const isValidUser =
    verifiedEmail &&
    (await bcrypt.compare(req.body.password, verifiedEmail.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = await createJWT({
    userId: verifiedEmail._id,
    role: verifiedEmail.role,
  });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("Usertoken", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: "false",
  });
  res.status(StatusCodes.OK).json({ msg: "User logged in" });
};

export const logout = async (req, res) => {
  res.cookie("Usertoken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
