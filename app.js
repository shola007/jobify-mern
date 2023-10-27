import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticatedUser } from "./middlewares/authMiddleware.js";
import userRouter from "./routes/userRouter.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./myreact-app/dist")));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticatedUser, jobRouter);
app.use("/api/v1/users", authenticatedUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./myreact-app/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use(errorHandlerMiddleware);

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("db connected"))
  .catch(() => console.log("db failed"));

app.listen(5050, (error) => {
  if (error) {
    console.log("Error 404");
  } else {
    console.log("Server Running.....");
  }
});
