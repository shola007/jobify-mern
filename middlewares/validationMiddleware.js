import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import jobModels from "../models/jobModels.js";
import authModels from "../models/authModels.js";

const withValidateError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsMessage = errors.array().map((error) => error.msg);
        if (errorsMessage[0].startsWith("no job")) {
          throw new NotFoundError(errorsMessage);
        }
        if (errorsMessage[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        console.log(errorsMessage);
        throw new BadRequestError(errorsMessage);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidateError([
  body("company").notEmpty().withMessage("Company is not provided"),
  body("position").notEmpty().withMessage("Position is not provided"),
  body("jobLocation").notEmpty().withMessage("job location is not provided"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid job type value"),
]);

export const validateIdParam = withValidateError([
  param("id").custom(async (value, { req }) => {
    const isValidId = await mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid mongoDB id");
    const job = await jobModels.findById(value);
    if (!job) throw new NotFoundError(`no job found for id : ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

export const validateRegisterInput = withValidateError([
  body("firstname").notEmpty().withMessage("first name is required"),
  body("lastname").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const findEmail = await authModels.findOne({ email });
      if (findEmail) {
        throw new BadRequestError("email already exist ");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password less than 8 character"),
]);

export const validateLoginInput = withValidateError([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password less than 8 character"),
]);

export const validateUpdateUserInput = withValidateError([
  body("firstname").notEmpty().withMessage("first name is required"),
  body("lastname").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const findEmail = await authModels.findOne({ email });
      if (findEmail && findEmail._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exist ");
      }
    }),
]);
