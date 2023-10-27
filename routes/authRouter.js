import express from "express";
const authRouter = express.Router();
import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middlewares/validationMiddleware.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "IP rate limit exceeded, retry in 15 minutes.",
});

authRouter.post("/register", apiLimiter, validateRegisterInput, register);
authRouter.post("/login", apiLimiter, validateLoginInput, login);
authRouter.get("/logout", logout);

export default authRouter;
