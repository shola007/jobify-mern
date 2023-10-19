import express from "express";
const userRouter = express.Router();
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import {
  authorizedPermissionToStats,
  checkTestUser,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

userRouter.get("/current-user", getCurrentUser);
userRouter.get(
  "/admin/app-stats",
  authorizedPermissionToStats,
  getApplicationStats
);
userRouter.patch(
  "/update-user",
  checkTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default userRouter;
