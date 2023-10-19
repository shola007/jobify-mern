import { StatusCodes } from "http-status-codes";
import jobModels from "../models/jobModels.js";
import authModels from "../models/authModels.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const getUser = await authModels.findOne({ _id: req.user.userId });
  const withoutPassword = getUser.toRemovePassword();
  res.status(StatusCodes.OK).json({ getUser: withoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const jobs = await jobModels.countDocuments();
  const users = await authModels.countDocuments();
  res.status(StatusCodes.OK).json({ jobs, users });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    obj.avatar = response.secure_url;
    obj.avatarPublicId = response.public_id;
  }

  const updatedUser = await authModels.findByIdAndUpdate(req.user.userId, obj);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
