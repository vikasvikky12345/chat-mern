import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRouter from "./routers/messageRouter.js";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import { connectToMongodb } from "./db/connectToMongodb.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "internal error";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connectToMongodb();
  console.log(`Server is running on port ${PORT}`);
});
