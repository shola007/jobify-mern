import express from "express";
const jobRouter = express.Router();
import {
  getAllJobs,
  createJobs,
  getSingleJob,
  updateJobs,
  deleteJobs,
  showStats,
} from "../controllers/jobController.js";

import {
  validateJobInput,
  validateIdParam,
} from "../middlewares/validationMiddleware.js";
import { checkTestUser } from "../middlewares/authMiddleware.js";

jobRouter
  .route("/")
  .get(getAllJobs)
  .post(checkTestUser, validateJobInput, createJobs);

jobRouter.route("/stats").get(showStats);

jobRouter
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(checkTestUser, validateJobInput, validateIdParam, updateJobs)
  .delete(checkTestUser, validateIdParam, deleteJobs);

export default jobRouter;
