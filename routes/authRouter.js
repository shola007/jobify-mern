import express from "express";
const authRouter = express.Router();
import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middlewares/validationMiddleware.js";

authRouter.post("/register", validateRegisterInput, register);
authRouter.post("/login", validateLoginInput, login);
authRouter.get("/logout", logout);

export default authRouter;
